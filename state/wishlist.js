let wishlist = []

export function toggleWishList(product){
    const exists = wishlist.find(p => p.id === product.id)

    if(exists){
        wishlist = wishlist.filter(p => p.id !== product.id)
    } else {
        wishlist.push(product)
    }

    console.log("Wishlist: ", wishlist)
}

export function getWishlist(){
    return wishlist
}