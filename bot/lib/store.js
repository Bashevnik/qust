import { kv } from '@vercel/kv';

// Telegram delivers each photo of an album as a separate update. We buffer
// them under the shared media_group_id and let the first arrival ("leader")
// wait briefly, then read back whatever the whole album collected.

export async function appendToAlbum(groupId, item) {
  await kv.rpush(`album:${groupId}`, JSON.stringify(item));
  await kv.expire(`album:${groupId}`, 60);
}

export async function tryAcquireLock(groupId) {
  // INCR is atomic regardless of whether the key already existed — whoever
  // gets back 1 is unambiguously the first (and only) leader for this group.
  const key = `lock:${groupId}`;
  const n = await kv.incr(key);
  console.log(`lock incr for ${groupId} -> ${n}`);
  if (n === 1) await kv.expire(key, 55);
  return n === 1;
}

export async function readAlbum(groupId) {
  const items = await kv.lrange(`album:${groupId}`, 0, -1);
  return items.map(i => (typeof i === 'string' ? JSON.parse(i) : i));
}

export async function clearAlbum(groupId) {
  await kv.del(`album:${groupId}`, `lock:${groupId}`);
}
