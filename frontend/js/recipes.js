document.addEventListener('DOMContentLoaded', async () => {
  try {
    const { recipes } = await api.apiGet('/api/recipes');
    const grid = document.getElementById('recipe-grid');
    if (!recipes || recipes.length === 0) {
      grid.innerHTML = '<p class="muted">No recipes available.</p>';
      return;
    }
    grid.innerHTML = recipes.map(r => `
      <div class="card">
        <img src="${r.image_url || 'https://images.unsplash.com/photo-1514512364185-4c2bcd0b9d2e?auto=format&fit=crop&w=800&q=60'}" alt="${r.title}" />
        <div class="card-body">
          <h3>${r.title}</h3>
          <p class="muted">${r.description}</p>
          <details>
            <summary>Ingredients</summary>
            <ul>${r.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
          </details>
          <details>
            <summary>Steps</summary>
            <ol>${r.steps.map(s => `<li>${s}</li>`).join('')}</ol>
          </details>
        </div>
      </div>
    `).join('');
  } catch (e) {
    console.error(e);
  }
});