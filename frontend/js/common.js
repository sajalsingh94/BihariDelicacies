async function fetchMe() {
  try {
    const res = await fetch('/api/auth/me', { credentials: 'include' });
    if (!res.ok) return { authenticated: false, user: null };
    return res.json();
  } catch {
    return { authenticated: false, user: null };
  }
}

function renderHeader(auth) {
  const header = document.getElementById('site-header');
  const isAuthed = auth && auth.authenticated;
  header.innerHTML = `
    <nav class="nav container">
      <a class="brand" href="/">Bihari Delicacies</a>
      <a href="/categories.html">Categories</a>
      <a href="/recipes.html">Recipes</a>
      <span class="spacer"></span>
      ${isAuthed ? `<a href="/upload.html">Upload</a>` : ''}
      ${isAuthed ? `<button id="logout-btn" class="btn" style="padding:0.45rem 0.8rem;">Logout</button>` : `<a class="btn" href="/login.html">Login</a>`}
    </nav>
  `;

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      window.location.href = '/';
    });
  }
}

function renderFooterYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', async () => {
  const auth = await fetchMe();
  renderHeader(auth);
  renderFooterYear();
});