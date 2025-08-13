document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('upload-form');
  const msg = document.getElementById('upload-msg');

  // Ensure user is logged in
  const meRes = await fetch('/api/auth/me', { credentials: 'include' });
  const me = await meRes.json().catch(() => ({ authenticated: false }));
  if (!me.authenticated) {
    window.location.href = '/login.html';
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = '';
    const data = new FormData(form);
    try {
      const res = await api.apiPostForm('/api/products', data);
      msg.textContent = 'Product uploaded successfully!';
      form.reset();
    } catch (err) {
      msg.textContent = err.message;
    }
  });
});