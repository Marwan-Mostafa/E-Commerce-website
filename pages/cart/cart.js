import { getCart, updateQuantity, removeFromCart, getSubtotal, getTotal, formatCurrency } from '../../state/cartState.js';

const cartRows = document.getElementById('cart-rows');
const subtotalEl = document.getElementById('cart-subtotal');
const totalEl = document.getElementById('cart-total');
const cartContent = document.getElementById('cart-content');
const emptyState = document.getElementById('cart-empty-state');
const checkoutBtn = document.getElementById('checkout-btn');

function renderRow(item) {
    const li = document.createElement('li');
    li.className = 'grid grid-cols-[100px_1fr_1fr_1fr_40px] items-center gap-4 py-4';
    li.dataset.id = item.id;

    li.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-md bg-[#FAF3EA]" />
        <span class="text-gray-700">${item.name}</span>
        <span class="text-gray-500">${formatCurrency(item.price)}</span>
        <input type="number" min="1" value="${item.quantity}"
            aria-label="Quantity for ${item.name}"
            class="quantity-input w-16 border border-gray-300 rounded-md px-2 py-2 text-sm text-center
                   hover:border-gray-400
                   focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold
                   transition-colors" />
        <span class="row-subtotal text-gray-800">${formatCurrency(item.price * item.quantity)}</span>
        <button type="button" aria-label="Remove ${item.name} from cart"
            class="remove-btn text-gold hover:text-red-500 transition-colors justify-self-center">
            <i class="fa-solid fa-trash"></i>
        </button>
    `;

    return li;
}

function render() {
    const items = getCart();

    if (items.length === 0) {
        checkoutBtn.setAttribute('aria-disabled', 'true');
        cartContent.classList.add('hidden');
        emptyState.classList.remove('hidden');
        emptyState.classList.add('flex');
        return;
    }

    cartContent.classList.remove('hidden');
    emptyState.classList.add('hidden');
    emptyState.classList.remove('flex');

    cartRows.innerHTML = '';
    items.forEach(item => cartRows.appendChild(renderRow(item)));

    subtotalEl.textContent = formatCurrency(getSubtotal());
    totalEl.textContent = formatCurrency(getTotal());

    const isEmpty = items.length === 0;
    checkoutBtn.setAttribute('aria-disabled', String(isEmpty));
}

function wireRowEvents() {
    cartRows.addEventListener('change', (e) => {
        if (!e.target.classList.contains('quantity-input')) return;

        const row = e.target.closest('li');
        const id = Number(row.dataset.id);
        const quantity = Math.max(1, parseInt(e.target.value, 10) || 1);

        updateQuantity(id, quantity);
    });

    cartRows.addEventListener('click', (e) => {
        const btn = e.target.closest('.remove-btn');
        if (!btn) return;

        const row = btn.closest('li');
        removeFromCart(Number(row.dataset.id));
    });
}

function init() {
    render();
    wireRowEvents();
    window.addEventListener('cart:updated', render);
}

init()