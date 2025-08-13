async function apiGet(path, opts = {}) {
  const res = await fetch(path, { credentials: 'include', ...opts });
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

async function apiPostJSON(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

async function apiPostForm(path, formData) {
  const res = await fetch(path, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Upload failed');
  return data;
}

window.api = { apiGet, apiPostJSON, apiPostForm };