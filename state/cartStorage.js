import {
    dispatchCartUpdated,
} from "./cartEvents.js";

import {
    CART_KEY,
    CART_UPDATED_EVENT,
} from "./constants.js";

function isValidCart(cart) {

    return Array.isArray(cart);

}

export function loadCart() {

    const raw = localStorage.getItem(CART_KEY);

    if (!raw) {

        return [];

    }

    try {

        const parsed = JSON.parse(raw);

        return isValidCart(parsed)
            ? parsed
            : [];

    } catch (error) {

        console.warn(

            "[cartStorage] Failed to parse cart data.",

            error

        );

        return [];

    }

}

export function saveCart(cart) {

    try {

        localStorage.setItem(

            CART_KEY,

            JSON.stringify(cart)

        );

    } catch (error) {

        console.warn(

            "[cartStorage] Failed to save cart.",

            error

        );

    }

    dispatchCartUpdated(cart);

}

export function clearCartStorage() {

    try {

        localStorage.removeItem(CART_KEY);

    } catch (error) {

        console.warn(

            "[cartStorage] Failed to clear cart.",

            error

        );

    }

}