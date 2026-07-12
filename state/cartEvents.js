import {

    CART_UPDATED_EVENT,

} from "./constants.js";


export function dispatchCartUpdated(cart) {

    window.dispatchEvent(

        new CustomEvent(

            CART_UPDATED_EVENT,

            {

                detail: {

                    cart: structuredClone(cart),

                },

            }

        )

    );

}


export function subscribeToCart(callback) {

    window.addEventListener(

        CART_UPDATED_EVENT,

        callback

    );

}


export function unsubscribeFromCart(callback) {

    window.removeEventListener(

        CART_UPDATED_EVENT,

        callback

    );

}