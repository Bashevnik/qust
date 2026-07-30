import { appendToAlbum, tryAcquireLock, readAlbum, clearAlbum } from '../lib/store.js';
import { sendMessage, downloadFile } from '../lib/telegram.js';
import { parseProductCaption } from '../lib/parse.js';
import { getFile, putFile, uploadImage } from '../lib/github.js';

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

  // Ack Telegram immediately — it retries aggressively if we're slow/silent.
  res.status(200).send('ok');

  if (!msg || !msg.photo) return;
  if (!ADMIN_CHAT_ID || String(msg.from.id) !== String(ADMIN_CHAT_ID)) return;

  try {
    const groupId = msg.media_group_id || `single-${msg.message_id}`;
    const photo = msg.photo[msg.photo.length - 1]; // highest resolution
    await appendToAlbum(groupId, { file_id: photo.file_id, caption: msg.caption || '' });

    // Only one update per album should do the work — the rest just contribute their photo above.
    const isLeader = msg.media_group_id ? await tryAcquireLock(groupId) : true;
    if (!isLeader) return;

    if (msg.media_group_id) {
      // give the rest of the album a moment to land in the buffer
      await new Promise(r => setTimeout(r, 1500));
    }

    const items = await readAlbum(groupId);
    await clearAlbum(groupId);

    const caption = items.map(i => i.caption).find(c => c && c.trim());
    if (!caption) {
      await sendMessage(msg.chat.id, '⚠️ Не нашёл описание товара в сообщении — нужна подпись с названием, ценой и цветом.');
      return;
    }

    const parsed = await parseProductCaption(caption);

    const images = [];
    for (let i = 0; i < items.length; i++) {
      const buf = await downloadFile(items[i].file_id);
      const suffix = i === 0 ? '' : String(i + 1);
      const fileName = `${slugify(parsed.name)}${suffix}.jpg`;
      const imgPath = `images/${fileName}`;
      await uploadImage(imgPath, buf, `new drop: add image ${fileName}`);
      images.push(imgPath);
    }

    const { content, sha } = await getFile(PRODUCTS_PATH);
    const { newContent, id } = insertProduct(content, parsed, images);
    await putFile(PRODUCTS_PATH, newContent, `new drop: add product ${parsed.name}`, sha);

    await sendMessage(
      msg.chat.id,
      `✅ Добавил: <b>${escapeHtml(parsed.name)}</b> (${escapeHtml(parsed.type)}, ${parsed.price} ₽, ${escapeHtml(parsed.color)})\n` +
      `id: <code>${id}</code>\nФото: ${images.length}\n` +
      `Появится на сайте через 1-2 минуты (деплой автоматический).`
    );
  } catch (err) {
    console.error(err);
    try {
      await sendMessage(msg.chat.id, `❌ Не получилось добавить товар: ${escapeHtml(err.message)}`);
    } catch (_) { /* best effort */ }
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
