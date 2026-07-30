import { kv } from '@vercel/kv';

// Telegram delivers each photo of an album as a separate update. We buffer
// them under the shared media_group_id and let the first arrival ("leader")
// wait briefly, then read back whatever the whole album collected.

export async function appendToAlbum(groupId, item) {
  await kv.rpush(`album:${groupId}`, JSON.stringify(item));
  await kv.expire(`album:${groupId}`, 30);
}

export async function tryAcquireLock(groupId) {
  const ok = await kv.set(`lock:${groupId}`, '1', { nx: true, ex: 10 });
  return ok === 'OK' || ok === true;
}

export async function readAlbum(groupId) {
  const items = await kv.lrange(`album:${groupId}`, 0, -1);
  return items.map(i => (typeof i === 'string' ? JSON.parse(i) : i));
}

export async function clearAlbum(groupId) {
  await kv.del(`album:${groupId}`, `lock:${groupId}`);
}
