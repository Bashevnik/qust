import { appendToAlbum, tryAcquireLock, readAlbum, clearAlbum } from '../lib/store.js';
import { sendMessage, downloadFile } from '../lib/telegram.js';
import { parseProductCaption } from '../lib/parse.js';
import { getFile, putFile, uploadImage } from '../lib/github.js';

// Даём функции время докачать все фото альбома и закоммитить их в GitHub —
// на Hobby-плане по умолчанию было бы 10 сек, этого не хватает.
export const maxDuration = 60;

const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;
const PRODUCTS_PATH = 'js/products.js';
const NEW_DROP_ANCHOR = '// добавляй новые товары дропа сюда, поставь newDrop: true';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(200).send('ok');
    return;
  }

  const update = req.body;
  const msg = update && update.message;

  if (!msg || !msg.photo) {
    console.log('skip: no message/photo in update');
    res.status(200).send('ok');
    return;
  }

  if (!ADMIN_CHAT_ID || String(msg.from.id) !== String(ADMIN_CHAT_ID)) {
    console.log(`skip: sender ${msg.from && msg.from.id} != ADMIN_CHAT_ID ${ADMIN_CHAT_ID}`);
    res.status(200).send('ok');
    return;
  }

  try {
    // Telegram не всегда присылает media_group_id для пересланных альбомов —
    // на этот случай общий ключ на чат, чтобы всё равно собрать все фото вместе.
    const groupId = msg.media_group_id || `chat-${msg.chat.id}`;
    const photo = msg.photo[msg.photo.length - 1]; // highest resolution
    console.log(`photo received update=${update.update_id} msg=${msg.message_id} at ${Date.now()}, groupId=${groupId}, hasCaption=${!!msg.caption}`);
    await appendToAlbum(groupId, { file_id: photo.file_id, caption: msg.caption || '' });

    // Только один апдейт на альбом должен всё обработать — остальные просто добавляют своё фото выше.
    const isLeader = await tryAcquireLock(groupId);
    if (!isLeader) {
      console.log(`not leader for ${groupId}, exiting`);
      res.status(200).send('ok');
      return;
    }

    // Фото одной пересылки могут доходить растянуто по времени (не пачкой),
    // поэтому ждём не фиксированную паузу, а "тишину" — пока не перестанут
    // прибывать новые, с потолком по общему времени ожидания.
    await waitForAlbumToSettle(groupId);

    const items = await readAlbum(groupId);
    console.log(`leader for ${groupId}, collected ${items.length} photo(s)`);
    // Блокировку и буфер держим до самого конца — иначе опоздавшее фото той
    // же пересылки увидит пустое место и создаст себе отдельный "альбом".

    const caption = items.map(i => i.caption).find(c => c && c.trim());
    if (!caption) {
      console.log('no caption found among album items');
      await clearAlbum(groupId);
      await sendMessage(msg.chat.id, '⚠️ Не нашёл описание товара в сообщении — нужна подпись с названием, ценой и цветом.');
      res.status(200).send('ok');
      return;
    }

    const parsed = parseProductCaption(caption);
    console.log('parsed:', JSON.stringify(parsed));

    const images = [];
    for (let i = 0; i < items.length; i++) {
      const buf = await downloadFile(items[i].file_id);
      const suffix = i === 0 ? '' : String(i + 1);
      const fileName = `${slugify(parsed.name)}${suffix}.jpg`;
      const imgPath = `images/${fileName}`;
      await uploadImage(imgPath, buf, `new drop: add image ${fileName}`);
      images.push(imgPath);
      console.log(`uploaded ${imgPath}`);
    }

    const { content, sha } = await getFile(PRODUCTS_PATH);
    const { newContent, id } = insertProduct(content, parsed, images);
    await putFile(PRODUCTS_PATH, newContent, `new drop: add product ${parsed.name}`, sha);
    console.log(`product committed: ${id}`);

    await clearAlbum(groupId);

    await sendMessage(
      msg.chat.id,
      `✅ Добавил: <b>${escapeHtml(parsed.name)}</b> (${escapeHtml(parsed.type)}, ${parsed.price} ₽, ${escapeHtml(parsed.color)})\n` +
      `id: <code>${id}</code>\nФото: ${images.length}\n` +
      `Появится на сайте через 1-2 минуты (деплой автоматический).`
    );

    res.status(200).send('ok');
  } catch (err) {
    console.error(err);
    try {
      await sendMessage(msg.chat.id, `❌ Не получилось добавить товар: ${escapeHtml(err.message)}`);
    } catch (_) { /* best effort */ }
    res.status(200).send('ok');
  }
}

async function waitForAlbumToSettle(groupId, { quietMs = 7000, maxTotalMs = 35000, pollMs = 700 } = {}) {
  const start = Date.now();
  let lastSize = (await readAlbum(groupId)).length;
  let lastChangeAt = Date.now();

  while (Date.now() - start < maxTotalMs) {
    await new Promise(r => setTimeout(r, pollMs));
    const size = (await readAlbum(groupId)).length;
    if (size !== lastSize) {
      console.log(`album still growing: ${lastSize} -> ${size}`);
      lastSize = size;
      lastChangeAt = Date.now();
    }
    if (Date.now() - lastChangeAt >= quietMs) break;
  }
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeHtml(s) {
  return String(s).replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
}

function insertProduct(content, p, images) {
  let id = `${p.cat}-${slugify(p.name)}`;
  let n = 2;
  while (content.includes(`id: '${id}'`)) {
    id = `${p.cat}-${slugify(p.name)}-v${n++}`;
  }

  const desc = p.desc.map(d => `      '${String(d).replace(/'/g, "\\'")}'`).join(',\n');
  const imgs = images.map(i => `'${i}'`).join(', ');

  const entry =
`  {
    id: '${id}',
    name: '${String(p.name).replace(/'/g, "\\'")}',
    type: '${String(p.type).replace(/'/g, "\\'")}',
    cat: '${p.cat}',
    price: ${p.price},
    color: '${p.color}',
    newDrop: true,
    images: [${imgs}],
    desc: [
${desc}
    ]
  },
`;

  const idx = content.indexOf(NEW_DROP_ANCHOR);
  if (idx === -1) throw new Error('anchor comment not found in products.js');
  const insertAt = content.indexOf('\n', idx) + 1;
  const newContent = content.slice(0, insertAt) + entry + content.slice(insertAt);
  return { newContent, id };
}
