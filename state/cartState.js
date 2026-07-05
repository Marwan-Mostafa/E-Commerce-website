const CART_KEY = 'furniro_cart';

let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart:updated', { detail: { cart: [...cart] } }));
}

export function addToCart(product) {
    const existingItem = cart.find(
        item => item.id === product.id && item.size === product.size && item.color === product.color
    );

    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        cart.push(product);
    }

    saveCart();
}

export function getCart() {
    return [...cart];
}

export function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

export function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    item.quantity = quantity;
    saveCart();
}

export function clearCart() {
    cart = [];
    saveCart();
}

export function getItemCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function getSubtotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getTotal() {
    return getSubtotal();
}

export function formatCurrency(amount) {
    const formatted = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
    return `Rs. ${formatted}`;
}