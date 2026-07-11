const CART_KEY = "furniro_cart";


function loadCart() {
    const raw = localStorage.getItem(CART_KEY);

    if (!raw) return [];

    try {
        const parsed = JSON.parse(raw);

        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.warn(
            "[cartState] Corrupted cart data. Resetting cart.",
            error
        );

        return [];
    }
}

let cart = loadCart();

function saveCart() {
    try {
        localStorage.setItem(
            CART_KEY,
            JSON.stringify(cart)
        );
    } catch (error) {
        console.warn(
            "[cartState] Failed to save cart.",
            error
        );
    }

    window.dispatchEvent(
        new CustomEvent("cart:updated", {
            detail: {
                cart: getCart(),
            },
        })
    );
}

function toPositiveInteger(value, fallback = 1) {
    const number = Number(value);

    return Number.isFinite(number) && number > 0
        ? Math.floor(number)
        : fallback;
}

function isSameCartLine(a, b) {
    return (
        a.id === b.id &&
        (a.size ?? null) === (b.size ?? null) &&
        (a.color ?? null) === (b.color ?? null)
    );
}

function resolveCartItem(target) {
    if (typeof target === "number") {
        return cart.find(
            (item) => item.id === target
        );
    }

    if (target && typeof target === "object") {
        return cart.find((item) =>
            isSameCartLine(item, target)
        );
    }

    return null;
}

export function addToCart(product) {
    if (!product || product.id == null) {
        console.warn(
            "[cartState] Invalid product.",
            product
        );

        return;
    }

    const item = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        oldPrice: product.oldPrice ?? null,
        discount: product.discount ?? null,
        size: product.size ?? null,
        color: product.color ?? null,
        quantity: toPositiveInteger(
            product.quantity,
            1
        ),
    };

    const existing = resolveCartItem(item);

    if (existing) {
        existing.quantity += item.quantity;
    } else {
        cart.push(item);
    }

    saveCart();
}

export function getCart() {
    return cart.map((item) => ({
        ...item,
    }));
}

export function removeFromCart(target) {
    if (typeof target === "number") {
        cart = cart.filter(
            (item) => item.id !== target
        );
    } else {
        cart = cart.filter(
            (item) =>
                !isSameCartLine(item, target)
        );
    }

    saveCart();
}

export function updateQuantity(target, quantity) {
    const item = resolveCartItem(target);

    if (!item) return;

    const safeQuantity = toPositiveInteger(
        quantity,
        0
    );

    if (safeQuantity <= 0) {
        removeFromCart(target);
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
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );
}

export function getTotal() {
    return getSubtotal();
}


export function formatCurrency(amount) {
    return `Rs. ${new Intl.NumberFormat(
        "en-US",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }
    ).format(amount)}`;
}