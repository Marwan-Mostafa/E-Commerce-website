// let wishlist = []

// export function toggleWishlist(product){
//     const exists = wishlist.find(p => p.id === product.id)

//     if(exists){
//         wishlist = wishlist.filter(p => p.id !== product.id)
//     } else {
//         wishlist.push(product)
//     }

//     console.log("Wishlist: ", wishlist)
// }

// export function getWishlist(){
//     return wishlist
// }

const WISHLIST_KEY = "wishlist"

let wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []

function saveWishlist() {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
}

export function toggleWishlist(product){
    const exits = wishlist.find((item)=> item.id === product.id)

    if(exits){
        wishlist = wishlist.filter((item)=> item.id !== product.id)
    }else {
        wishlist.push(product)
    }
    saveWishlist()
    console.log("Wishlist:", wishlist)
}

export function getWishlist(){
    return wishlist
}