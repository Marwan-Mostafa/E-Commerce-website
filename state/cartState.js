const CART_KEY = "furniro_cart";

function loadCart() {
    const raw = localStorage.getItem(CART_KEY);

    if (!raw) return [];

    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.warn(
            "[cartState] Corrupted cart data in localStorage, resetting cart.",
            error
        );

        return [];
    }
}

let cart = loadCart();

function saveCart() {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
        console.warn(
            "[cartState] Failed to persist cart to localStorage.",
            error
        );
    }

    window.dispatchEvent(
        new CustomEvent("cart:updated", {
            detail: {
                cart: [...cart],
            },
        })
    );
}

function isSameCartLine(a, b) {
    return (
        a.id === b.id &&
        (a.size ?? null) === (b.size ?? null) &&
        (a.color ?? null) === (b.color ?? null)
    );
}

function toPositiveInteger(value, fallback) {
    const number = Number(value);

    return Number.isFinite(number) && number > 0
        ? Math.floor(number)
        : fallback;
}

export function addToCart(product) {
    if (!product || product.id == null) {
        console.warn(
            "[cartState] addToCart called without a valid product id.",
            product
        );

        return;
    }

    const quantity = toPositiveInteger(product.quantity, 1);

    const item = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        oldPrice: product.oldPrice ?? null,
        discount: product.discount ?? null,
        size: product.size ?? null,
        color: product.color ?? null,
        quantity,
    };

    const existingItem = cart.find((cartItem) =>
        isSameCartLine(cartItem, item)
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push(item);
    }

    saveCart();
}

export function getCart() {
    return cart.map((item) => ({ ...item }));
}

export function removeFromCart(product) {
    cart = cart.filter(
        (item) => !isSameCartLine(item, product)
    );

    saveCart();
}

export function updateQuantity(product, quantity) {
    const item = cart.find((cartItem) =>
        isSameCartLine(cartItem, product)
    );

    if (!item) return;

    const safeQuantity = toPositiveInteger(quantity, 0);

    if (safeQuantity <= 0) {
        removeFromCart(product);
        return;
    }

    item.quantity = safeQuantity;

    saveCart();
}

export function clearCart() {
    cart = [];

    saveCart();
}

export function getItemCount() {
    return cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );
}

export function getSubtotal() {
    return cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
}

export function getTotal() {
    return getSubtotal();
}

export function formatCurrency(amount) {
    const formatted = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);

    return `Rs. ${formatted}`;
}