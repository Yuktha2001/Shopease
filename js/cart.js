let cart = JSON.parse(localStorage.getItem('shopease-cart') || '[]');

function saveCart() {
  localStorage.setItem('shopease-cart', JSON.stringify(cart));
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  saveCart();
  updateCartUI();
  showToast(`${product.emoji} ${product.name} added to cart!`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { saveCart(); updateCartUI(); }
}

function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cart-count').textContent = count;
  document.getElementById('cart-total').textContent = total.toLocaleString('en-IN');
  const container = document.getElementById('cart-items');
  if (cart.length === 0) {
    container.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
    return;
  }
  container.innerHTML = cart.map(i => `
    <div class="cart-item">
      <span class="item-emoji">${i.emoji}</span>
      <div class="item-details">
        <h4>${i.name}</h4>
        <p>₹${i.price.toLocaleString('en-IN')}</p>
        <div class="qty-controls">
          <button onclick="changeQty(${i.id}, -1)">−</button>
          <span>${i.qty}</span>
          <button onclick="changeQty(${i.id}, 1)">+</button>
        </div>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${i.id})">🗑️</button>
    </div>
  `).join('');
}

function toggleCart() {
  document.getElementById('cart-sidebar').classList.toggle('open');
  document.getElementById('cart-overlay').classList.toggle('open');
}

function checkout() {
  if (cart.length === 0) { showToast('Your cart is empty!'); return; }
  showToast('🎉 Order placed successfully!');
  cart = [];
  saveCart();
  updateCartUI();
  toggleCart();
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}
