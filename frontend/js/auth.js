document.addEventListener('DOMContentLoaded', async () => {
  const path = window.location.pathname;

  if (path.endsWith('/login.html')) {
    const form = document.getElementById('login-form');
    const msg = document.getElementById('login-msg');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      msg.textContent = '';
      try {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        await api.apiPostJSON('/api/auth/login', { email, password });
        window.location.href = '/';
      } catch (err) {
        msg.textContent = err.message;
      }
    });
  }

  if (path.endsWith('/signup.html')) {
    const form = document.getElementById('signup-form');
    const msg = document.getElementById('signup-msg');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      msg.textContent = '';
      try {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        await api.apiPostJSON('/api/auth/signup', { name, email, password });
        window.location.href = '/';
      } catch (err) {
        msg.textContent = err.message;
      }
    });
  }
});