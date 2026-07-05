import { getCart, getSubtotal, getTotal, formatCurrency, clearCart } from '../../state/cart.js';

const orderItemsList = document.getElementById('order-items');
const subtotalEl = document.getElementById('order-subtotal');
const totalEl = document.getElementById('order-total');
const form = document.getElementById('checkout-form');
const placeOrderBtn = document.getElementById('place-order-btn');
const paymentInputs = document.querySelectorAll('input[name="paymentMethod"]');
const paymentDescription = document.getElementById('payment-description');

const PAYMENT_DESCRIPTIONS = {
    bank: 'Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.',
    cod: 'Pay with cash when your order is delivered to your address.',
};

const REQUIRED_FIELDS = ['firstName', 'lastName', 'country', 'street', 'city', 'province', 'zip', 'phone', 'email'];

function renderOrderSummary() {
    const items = getCart();

    if (items.length === 0) {
        orderItemsList.innerHTML = `
            <li class="text-sm text-gray-500">Your cart is empty.
                <a href="/pages/shop.html" class="underline text-gold">Continue shopping</a>
            </li>`;
        placeOrderBtn.disabled = true;
        placeOrderBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        orderItemsList.innerHTML = items.map(item => `
            <li class="flex justify-between text-sm">
                <span class="text-gray-600">${item.name} <span class="text-gray-400">x ${item.quantity}</span></span>
                <span class="text-gray-800">${formatCurrency(item.price * item.quantity)}</span>
            </li>
        `).join('');
        placeOrderBtn.disabled = false;
        placeOrderBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }

    subtotalEl.textContent = formatCurrency(getSubtotal());
    totalEl.textContent = formatCurrency(getTotal());
}

function wirePaymentToggle() {
    paymentInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            paymentDescription.textContent = PAYMENT_DESCRIPTIONS[e.target.value];
        });
    });
}

function showFieldError(field, message) {
    const errorEl = field.parentElement.querySelector('.field-error');
    if (!errorEl) return;
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
    field.classList.add('border-red-500');
}

function clearFieldError(field) {
    const errorEl = field.parentElement.querySelector('.field-error');
    if (!errorEl) return;
    errorEl.classList.add('hidden');
    field.classList.remove('border-red-500');
}

function validateForm() {
    let isValid = true;
    let firstInvalidField = null;

    REQUIRED_FIELDS.forEach(name => {
        const field = form.elements[name];
        clearFieldError(field);
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required.');
            isValid = false;
            firstInvalidField ??= field;
        }
    });

    const emailField = form.elements['email'];
    if (emailField.value && !emailField.checkValidity()) {
        showFieldError(emailField, 'Enter a valid email address.');
        isValid = false;
        firstInvalidField ??= emailField;
    }

    firstInvalidField?.focus();

    return isValid;
}

function handleSubmit(e) {
    e.preventDefault();

    if (getCart().length === 0) return;
    if (!validateForm()) return;

    const paymentMethod = form.querySelector('input[name="paymentMethod"]:checked').value;

    clearCart();
    alert('Order placed! (placeholder — no backend wired up yet)')
}

function init() {
    renderOrderSummary();
    wirePaymentToggle();
    form.addEventListener('submit', handleSubmit);
    window.addEventListener('cart:updated', renderOrderSummary);
}

init();