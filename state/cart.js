let cart = []

export function addToCart(product){
    cart.push(product)
    console.log("cart: ", cart)
}

export function getCart(){
    return cart
}