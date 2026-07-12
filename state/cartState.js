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


function persist() {
    saveCart(cart)
}



export function addToCart(product) {
    if (!isValidProduct(product)) {
        console.warn("[cartState] Invalid product.", product)
        return
    }

    const normalized = normalizeProduct(product);

    const item = createCartItem(normalized);

    const existingItem = findCartItem(cart, item);

    if (existingItem) {
        existingItem.quantity += item.quantity
    } else {
        cart.push(item);
    }
    persist();
}



export function removeFromCart(target) {

    if (typeof target === "number") {
        cart = cart.filter(item => item.id !== target)
    } else {
        cart = cart.filter(item => !isSameCartLine(item, target))
    }

    persist()
}



export function updateQuantity(target, quantity) {

    const cartItem = findCartItem(cart, target)

    if (!cartItem) {
        return;
    }

    const safeQuantity = toPositiveInteger(quantity, 0)

    if (safeQuantity <= 0) {
        removeFromCart(target)
        return
    }

    cartItem.quantity = safeQuantity
    persist()

}


export function getCart() {
    return cloneCart(cart)
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


export function clearCart() {
    cart = []
    persist()
}


export { formatCurrency, }