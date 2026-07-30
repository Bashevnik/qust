// Прямые вызовы Upstash REST API вместо @vercel/kv — чтобы исключить любые
// сюрпризы конкретной версии клиентской библиотеки и видеть точно, что
// реально уходит и приходит по сети.

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

async function redis(...command) {
  const res = await fetch(KV_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });
  const data = await res.json();
  if (data.error) throw new Error(`Upstash error on ${command[0]}: ${data.error}`);
  return data.result;
}

export async function appendToAlbum(groupId, item) {
  await redis('RPUSH', `album:${groupId}`, JSON.stringify(item));
  await redis('EXPIRE', `album:${groupId}`, 60);
}

export async function tryAcquireLock(groupId) {
  // INCR всегда атомарен на стороне Redis: кто первым увидел 1 — тот и лидер.
  const n = await redis('INCR', `lock:${groupId}`);
  console.log(`lock incr for ${groupId} -> ${n} (type ${typeof n})`);
  if (n === 1) await redis('EXPIRE', `lock:${groupId}`, 55);
  return n === 1;
}

export async function readAlbum(groupId) {
  const items = await redis('LRANGE', `album:${groupId}`, 0, -1);
  return (items || []).map(i => (typeof i === 'string' ? JSON.parse(i) : i));
}

export async function clearAlbum(groupId) {
  await redis('DEL', `album:${groupId}`, `lock:${groupId}`);
}
