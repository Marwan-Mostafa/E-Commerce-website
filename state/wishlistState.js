import {
    loadCompareIds,
    saveCompareIds,
    clearCompareStorage,
} from "./wishlistStorage.js";


let wishlist = loadCompareIds();

const subscribers = new Set();


function notifySubscribers() {

    const snapshot = [...wishlist];

    subscribers.forEach(listener => {

        listener(snapshot);

    });

}

function persist() {

    saveCompareIds(wishlist);

    notifySubscribers();

}


export function getWishlist() {

    return [...wishlist];

}

export function getWishlistIds() {

    return wishlist.map(

        ({ id }) => id

    );

}

export function getWishlistCount() {

    return wishlist.length;

}

export function isInWishlist(productId) {

    return wishlist.some(

        ({ id }) => id === productId

    );

}

export function hasWishlistItem(productId) {

    return isInWishlist(productId);

}

export function getWishlistItem(productId) {

    return wishlist.find(

        ({ id }) => id === productId

    );

}

export function isWishlistEmpty() {

    return wishlist.length === 0;

}


export function addToWishlist(product) {

    if (isInWishlist(product.id)) {

        return false;

    }

    wishlist.push(product);

    persist();

    return true;

}

export function removeFromWishlist(productId) {

    wishlist = wishlist.filter(

        ({ id }) => id !== productId

    );

    persist();

}

export function toggleWishlist(product) {

    if (isInWishlist(product.id)) {

        removeFromWishlist(product.id);

        return false;

    }

    addToWishlist(product);

    return true;

}

export function clearWishlist() {

    wishlist = [];

    persist();

}


export function subscribeWishlist(listener) {

    if (typeof listener !== "function") {

        return () => { };

    }

    subscribers.add(listener);

    return () => {

        subscribers.delete(listener);

    };

}