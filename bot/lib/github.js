const OWNER  = process.env.GITHUB_OWNER;
const REPO   = process.env.GITHUB_REPO;
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const TOKEN  = process.env.GITHUB_TOKEN;

const API = 'https://api.github.com';

async function ghFetch(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github+json',
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    throw new Error(`GitHub API ${path} failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

export async function getFile(path) {
  const data = await ghFetch(`/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(path)}?ref=${BRANCH}`);
  return { content: Buffer.from(data.content, 'base64').toString('utf8'), sha: data.sha };
}

export async function putFile(path, content, message, sha) {
  await ghFetch(`/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(path)}`, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: Buffer.from(content, 'utf8').toString('base64'),
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });
}

export async function uploadImage(path, buffer, message) {
  await ghFetch(`/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(path)}`, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: buffer.toString('base64'),
      branch: BRANCH,
    }),
  });
}
