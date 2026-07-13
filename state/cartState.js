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


function notifySubscribers() {
    const snapshot = cloneCart(cart);
    subscribers.forEach(listener => {
        listener(snapshot);
    });
}

function persist() {
    saveCart(cart)
    notifySubscribers()
}



export function addToCart(product) {
    if (!isValidProduct(product)) {
        console.warn("[cartState] Invalid product.", product)
        return
    }

    const normalizedProduct = normalizeProduct(product);

    const newItem = createCartItem(normalizedProduct);

    const existingItem = findCartItem(cart, newItem);

    if (existingItem) {
        existingItem.quantity += newItem.quantity
    } else {
        cart.push(newItem);
    }
    persist();
}



export function removeFromCart(target) {
    cart = typeof target === "number" ? cart.filter(
        item => item.id !== target
    )

        : cart.filter(item =>
            !isSameCartLine(item, target)
        );

    persist();
}



export function updateQuantity(target, quantity) {

    const item = findCartItem(cart, target)

    if (!item) {
        return;
    }

    const safeQuantity = toPositiveInteger(quantity, 0)

    if (safeQuantity <= 0) {
        removeFromCart(target)
        return
    }

    item.quantity = safeQuantity
    persist()

}

export function getCart() {

    return cloneCart(cart);

}

export function getCartItem(target) {

    return findCartItem(cart, target);

}

export function hasProduct(target) {

    return Boolean(

        findCartItem(cart, target)

    );

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

export {
    formatCurrency,
};