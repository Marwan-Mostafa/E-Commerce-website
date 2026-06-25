const CART_KEY = "furinro_cart";

let cart =
    JSON.parse(localStorage.getItem(CART_KEY))
    || [];

function saveCart() {
    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );
}

export function addToCart(product) {

    const existingItem = cart.find(
        item =>
            item.id === product.id &&
            item.size === product.size &&
            item.color === product.color
    );

    if (existingItem) {

        existingItem.quantity += product.quantity;

    } else {

        cart.push(product);

    }

    saveCart();

    console.log("Cart:", cart);
}

export function getCart() {
    return cart;
}

export function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart();
}

export function clearCart() {

    cart = [];

    saveCart();
}