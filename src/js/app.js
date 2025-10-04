// src/js/app.js
document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  }

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const html = document.documentElement;
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') html.classList.add('dark');
    themeToggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  // Cart localStorage utilities
  const CART_KEY = 'myshop_cart_v1';
  function readCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; }
  }
  function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartUI(); }

  function addToCart(productId) {
    const products = window.PRODUCTS || [];
    const p = products.find(x => x.id === productId);
    if (!p) return;
    const cart = readCart();
    const existing = cart.find(i => i.id === productId);
    if (existing) existing.qty++;
    else cart.push({ id: p.id, title: p.title, price: p.price, image: p.image, qty: 1 });
    saveCart(cart);
    smallToast('تمت الإضافة إلى السلة');
  }

  function updateCartUI() {
    const cart = readCart();
    const count = cart.reduce((s, i) => s + (i.qty || 0), 0);
    const badge = document.getElementById('cartCountHeader');
    if (badge) badge.textContent = count;
    const cartCount = document.getElementById('cartCount');
    if (cartCount) cartCount.textContent = count;
  }

  // Small toast helper
  function smallToast(msg) {
    const t = document.createElement('div');
    t.className = 'fixed right-4 bottom-4 bg-gray-900 text-white px-4 py-2 rounded shadow z-50';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1800);
  }

  // Render products for grid on listing pages
  function renderProducts(list) {
    const container = document.getElementById('productsGrid');
    if (!container) return;
    container.innerHTML = '';
    list.forEach(p => {
      const el = document.createElement('article');
      el.className = 'bg-white rounded-lg shadow overflow-hidden';
      el.innerHTML = `
        <img class="w-full h-44 object-cover" src="${p.image}" alt="${p.title}">
        <div class="p-4">
          <h3 class="font-semibold">${p.title}</h3>
          <p class="text-sm text-gray-500 mt-1">${p.category}</p>
          <div class="mt-4 flex items-center justify-between">
            <div class="text-lg font-bold">$${p.price}</div>
            <div class="flex gap-2">
              <a href="product.html?id=${p.id}" class="px-3 py-1 border rounded">عرض</a>
              <button data-id="${p.id}" class="btn-primary add-btn">أضف إلى السلة</button>
            </div>
          </div>
        </div>
      `;
      container.appendChild(el);
    });
    // attach add handlers
    document.querySelectorAll('.add-btn').forEach(b => b.addEventListener('click', () => addToCart(Number(b.dataset.id))));
  }

  // init listing if present
  if (document.getElementById('productsGrid')) {
    const products = window.PRODUCTS || [];
    renderProducts(products);
  }

  // init cart UI on any page
  updateCartUI();

  // Helpers for product detail
  function getQueryParam(name) {
    try {
      const url = new URL(location.href);
      return url.searchParams.get(name);
    } catch (e) {
      // fallback simple parse
      const match = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
      return match ? decodeURIComponent(match[1]) : null;
    }
  }

  if (document.getElementById('productDetail')) {
    const id = Number(getQueryParam('id')) || 0;
    const p = (window.PRODUCTS || []).find(x => x.id === id);
    if (p) {
      const titleEl = document.getElementById('productTitle');
      const priceEl = document.getElementById('productPrice');
      const imgEl = document.getElementById('productImage');
      if (titleEl) titleEl.textContent = p.title;
      if (priceEl) priceEl.textContent = `$${p.price}`;
      if (imgEl) imgEl.src = p.image;
      const buyBtn = document.getElementById('buyBtn');
      if (buyBtn) buyBtn.addEventListener('click', () => addToCart(p.id));
    } else {
      // product not found
      const main = document.querySelector('main');
      if (main) main.innerHTML = '<p class="text-red-600">المنتج غير موجود</p>';
    }
  }

  // Checkout form simple validation
  if (document.getElementById('checkoutForm')) {
    const form = document.getElementById('checkoutForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      if (!name || !email) { smallToast('اكمل الحقول المطلوبة'); return; }
      smallToast('تم ارسال الطلب (محاكاة)');
      localStorage.removeItem(CART_KEY);
      updateCartUI();
      setTimeout(() => location.href = 'index.html', 1200);
    });
  }

  // Expose some helpers for console (optional)
  window.myshop = { addToCart, readCart, saveCart, renderProducts, updateCartUI };
});
