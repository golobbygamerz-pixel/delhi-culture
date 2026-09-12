/* ============================================================
   CART
   ============================================================ */
const cart = [];

const cartBtn      = document.getElementById('cartBtn');
const cartDrawer   = document.getElementById('cartDrawer');
const cartOverlay  = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCart');
const cartItemsEl  = document.getElementById('cartItems');
const cartFooter   = document.getElementById('cartFooter');
const cartTotalEl  = document.getElementById('cartTotal');
const cartCountEl  = document.getElementById('cartCount');
const toastEl      = document.getElementById('toast');

function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

let toastTimer;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

function updateCartUI() {
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  cartCountEl.textContent = totalQty;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<div class="cart-empty">Your cart is empty.<br>Go grab something.</div>`;
    cartFooter.style.display = 'none';
    return;
  }

  cartFooter.style.display = 'block';
  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}" />
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>Size: ${item.size} · Qty: ${item.qty}</p>
      </div>
      <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
    </div>
  `).join('');

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  cartTotalEl.textContent = '₹' + total.toLocaleString('en-IN');
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const size = product.sizes[0];
  const existing = cart.find(c => c.id === id && c.size === size);

  if (existing) existing.qty += 1;
  else cart.push({
    id: product.id, name: product.name, price: product.price,
    img: product.img, size, qty: 1
  });

  updateCartUI();
  showToast(`${product.name} added`);

  const btn = document.querySelector(`.add-btn[data-id="${id}"]`);
  if (btn