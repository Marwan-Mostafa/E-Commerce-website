import { CART_UPDATED_EVENT } from "./constants.js";


export function dispatchCartUpdated(cart) {
    window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT,

        {
            detail: {
                cart: structuredClone(cart),
            },
        })

    );

}


export function subscribeToCart(listener) {
    window.addEventListener(CART_UPDATED_EVENT, listener);

}


export function unsubscribeFromCart(listener) {
    window.removeEventListener(CART_UPDATED_EVENT, listener);

}