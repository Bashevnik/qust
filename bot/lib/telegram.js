const TG_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

export async function sendMessage(chatId, text) {
  await fetch(`${TG_API}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  });
}

async function getFilePath(fileId) {
  const res = await fetch(`${TG_API}/getFile?file_id=${fileId}`);
  const data = await res.json();
  if (!data.ok) throw new Error(`getFile failed: ${JSON.stringify(data)}`);
  return data.result.file_path;
}

export async function downloadFile(fileId) {
  const filePath = await getFilePath(fileId);
  const url = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${filePath}`;
  const res = await fetch(url);
  return Buffer.from(await res.arrayBuffer());
}
