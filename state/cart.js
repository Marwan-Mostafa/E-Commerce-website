let cart = []

export function addToCart(product){
    cart.push(product)
    console.log("Cart: ", cart)
}

export function getCart(){
    return cart
}