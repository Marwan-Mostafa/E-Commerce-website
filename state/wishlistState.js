const STORAGE_KEY = "furinro_wishlist";
const subscribers = new Set();

function loadWishlist() {

    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data
            ? JSON.parse(data)
            : [];
    }

    catch {
        return [];
    }

}

function saveWishlist(wishlist) {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(wishlist)

    );

    notifyWishlistSubscribers(wishlist);

}

export function getWishlist() {

    return loadWishlist();

}

export function getWishlistIds() {

    return loadWishlist()

        .map(product => product.id);

}

export function getWishlistCount() {

    return loadWishlist().length;

}

export function isInWishlist(productId) {

    return loadWishlist()

        .some(

            ({ id }) => id === productId

        );

}


export function addToWishlist(product) {

    const wishlist = loadWishlist();

    const exists = wishlist.some(

        ({ id }) => id === product.id

    );

    if (exists) {

        return false;

    }

    wishlist.push(product);

    saveWishlist(wishlist);

    return true;

}

export function removeFromWishlist(productId) {

    const wishlist = loadWishlist()

        .filter(

            ({ id }) => id !== productId

        );

    saveWishlist(wishlist);

}

export function toggleWishlist(product) {

    if (

        isInWishlist(product.id)

    ) {

        removeFromWishlist(product.id);

        return false;

    }

    addToWishlist(product);

    return true;

}

export function clearWishlist() {

    saveWishlist([]);

}



export function subscribeWishlist(listener) {

    subscribers.add(listener);

    return () =>

        subscribers.delete(listener);

}

function notifyWishlistSubscribers(

    wishlist

) {

    subscribers.forEach(listener =>

        listener(wishlist)

    );

}