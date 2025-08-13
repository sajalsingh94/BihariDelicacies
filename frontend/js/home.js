document.addEventListener('DOMContentLoaded', async () => {
  try {
    const { products } = await api.apiGet('/api/products?featured=1');
    const grid = document.getElementById('featured-grid');
    const empty = document.getElementById('no-featured');
    if (!products || products.length === 0) {
      empty.style.display = 'block';
      return;
    }
    grid.innerHTML = products.map(p => `
      <div class="card">
        <img src="${p.image_path || 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=60'}" alt="${p.name}" />
        <div class="card-body">
          <h3>${p.name}</h3>
          <div class="price">₹${Number(p.price).toFixed(2)}</div>
          <div class="seller">Seller: ${p.seller_name || '—'}</div>
        </div>
      </div>
    `).join('');
  } catch (e) {
    console.error(e);
  }
});