let currentFilter = 'all';

function renderProducts(filter = 'all') {
  const grid = document.getElementById('products-grid');
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-img">${p.emoji}</div>
      <div class="product-info">
        <span class="category-tag">${p.category}</span>
        <h3>${p.name}</h3>
        <p class="price">₹${p.price.toLocaleString('en-IN')}</p>
        <button onclick="addToCart(${p.id})">Add to Cart 🛒</button>
      </div>
    </div>
  `).join('');
}

function filterProducts(category) {
  currentFilter = category;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  renderProducts(category);
}

// Init
renderProducts();
updateCartUI();
