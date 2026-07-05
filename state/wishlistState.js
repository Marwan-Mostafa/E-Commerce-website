const WISHLIST_KEY = "wishlist"

let wishlist = []
try {
    wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []
} catch {
    wishlist = []
}

function saveWishlist() {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
}

export function toggleWishlist(product) {
    const exits = wishlist.find((item) => item.id === product.id)

    if (exits) {
        wishlist = wishlist.filter((item) => item.id !== product.id)
    } else {
        wishlist.push(product)
    }
    saveWishlist()
}

export function getWishlist() {
    return [...wishlist]
}