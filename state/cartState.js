import { loadCart, saveCart } from "./cartStorage.js";

import {
    cloneCart,
    createCartItem,
    findCartItem,
    isSameCartLine,
} from "./cartHelpers.js";

import {
    isValidProduct,
    normalizeProduct,
    toPositiveInteger,
} from "./cartValidation.js";

import {
    getItemCount as calculateItemCount,
    getSubtotal as calculateSubtotal,
    getTotal as calculateTotal,
    formatCurrency,
} from "./cartCalculations.js";

let cart = loadCart();

let subscribers = new Set();

function matchesTarget(item, target) {
    return typeof target === "number" || typeof target === "string"
        ? item?.id === target
        : isSameCartLine(item, target);
}

function notifySubscribers() {
    const snapshot = cloneCart(cart);
    subscribers.forEach((listener) => {
        try {
            listener(snapshot);
        } catch (error) {
            console.error("[cartState] Subscriber threw an error.", error);
        }
    });
}

function persist(previousCart) {
    try {
        saveCart(cart);
    } catch (error) {
        console.error("[cartState] Failed to persist cart. Rolling back.", error);
        cart = previousCart;
        return;
    }

    notifySubscribers();
}

export function addToCart(product) {
    if (!isValidProduct(product)) {
        console.warn("[cartState] Invalid product.", product);
        return;
    }

    const previousCart = cloneCart(cart);

    const normalizedProduct = normalizeProduct(product);
    const newItem = createCartItem(normalizedProduct);
    newItem.quantity = toPositiveInteger(newItem.quantity, 1);

    const existingItem = findCartItem(cart, newItem);

    if (existingItem) {
        existingItem.quantity = toPositiveInteger(
            existingItem.quantity + newItem.quantity,
            existingItem.quantity
        );
    } else {
        cart.push(newItem);
    }

    persist(previousCart);
}

export function removeFromCart(target) {
    const itemExists = cart.some((item) => matchesTarget(item, target));

    if (!itemExists) {
        return;
    }

    const previousCart = cloneCart(cart);

    cart = cart.filter((item) => !matchesTarget(item, target));

    persist(previousCart);
}

export function updateQuantity(target, quantity) {
    const item = findCartItem(cart, target);

    if (!item) {
        return;
    }

    const safeQuantity = toPositiveInteger(quantity, 0);

    if (safeQuantity <= 0) {
        removeFromCart(target);
        return;
    }

    const previousCart = cloneCart(cart);
    item.quantity = safeQuantity;
    persist(previousCart);
}

export function getCart() {
    return cloneCart(cart);
}

export function getCartItem(target) {
    const item = findCartItem(cart, target);
    return item ? cloneCart([item])[0] : null;
}

export function hasProduct(target) {
    return Boolean(findCartItem(cart, target));
}

export function isCartEmpty() {
    return cart.length === 0;
}

export function getItemCount() {
    return calculateItemCount(cart);
}

export function getSubtotal() {
    return calculateSubtotal(cart);
}

export function getTotal() {
    return calculateTotal(cart);
}

export function subscribe(listener) {
    if (typeof listener !== "function") {
        return () => { };
    }

    subscribers.add(listener);

    return () => {
        subscribers.delete(listener);
    };
}

export { formatCurrency };