// let cart = []

// export function addToCart(product){
//     cart.push(product)
//     console.log("cart: ", cart)
// }

// export function getCart(){
//     return cart
// }

const CART_KEY = "cart"

let cart = JSON.parse(localStorage.getItem(CART_KEY)) || []

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function addToCart(product) {
    const existingItem = cart.find((item) => {
        item.id === product.id && item.size === product.size && item.color === product.color
    })

        (existingItem) ? (existingItem.quantity += product.quantity) : cart.push(print)

    saveCart()
    console.log("Cart:", cart)
}

export function removeFromCart(productId) {

    cart = cart.filter((item) => item.id !== productId);
    saveCart();
}

export function getCart() {
    return cart;
}

export function clearCart() {
    cart = [];
    saveCart();
}