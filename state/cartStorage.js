import { dispatchCartUpdated, } from "./cartEvents.js";
import { CART_KEY, } from "./constants.js";
import { toPositiveInteger } from "./cartValidation.js";


function isValidCart(cart) {
    return Array.isArray(cart);
}


function isValidCartItem(item) {
    return (
        item &&
        typeof item === "object" &&
        item.id != null &&
        typeof item.name === "string" &&
        typeof item.price === "number"
    );
}

function sanitizeCartItem(item) {
    return {
        ...item,
        quantity: toPositiveInteger(item.quantity, 1),
    };
}


function sanitizeCart(cart) {
    return cart
        .filter(isValidCartItem)
        .map(sanitizeCartItem);
}


export function loadCart() {
    const raw = localStorage.getItem(CART_KEY);

    if (!raw) {
        return [];
    }

    try {
        const parsed = JSON.parse(raw);
        return isValidCart(parsed)
            ? sanitizeCart(parsed)
            : [];
    } catch (error) {
        console.warn("[cartStorage] Failed to parse cart data.", error);
        return [];
    }
}

export function saveCart(cart) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
        console.warn("[cartStorage] Failed to save cart.", error);
        throw error;
    }

    dispatchCartUpdated(cart);
}

export function clearCartStorage() {

    try {

        localStorage.removeItem(CART_KEY);

    } catch (error) {
        console.warn("[cartStorage] Failed to clear cart.", error);
    }

}