document.addEventListener('DOMContentLoaded', async () => {
  try {
    const { grouped } = await api.apiGet('/api/products/by-category');
    const container = document.getElementById('categories');
    const categories = Object.keys(grouped);
    if (categories.length === 0) {
      container.innerHTML = '<p class="muted">No products yet.</p>';
      return;
    }
    container.innerHTML = categories.map(cat => {
      const items = grouped[cat];
      return `
        <section class="category-section">
          <h2>${cat} <span class="muted">(${items.length})</span></h2>
          <div class="card-grid">
            ${items.map(p => `
              <div class="card">
                <img src="${p.image_path || 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=60'}" alt="${p.name}" />
                <div class="card-body">
                  <h3>${p.name}</h3>
                  <div class="price">₹${Number(p.price).toFixed(2)}</div>
                  <div class="seller">Seller: ${p.seller_name || '—'}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      `;
    }).join('');
  } catch (e) {
    console.error(e);
  }
});