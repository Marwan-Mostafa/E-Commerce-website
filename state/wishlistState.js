import {
    loadCompareIds as loadWishlist,
    saveCompareIds as saveWishlist,
    clearCompareStorage as clearWishlistStorage,
} from "./wishlistStorage.js";

let wishlist = loadWishlist();
const subscribers = new Set();



function sameId(a, b) {
    return String(a) === String(b);
}

function cloneWishlist(items) {
    return items.map((item) => ({ ...item }));
}

function isValidProduct(product) {
    return Boolean(product) && typeof product === "object" && "id" in product;
}

function notifySubscribers() {
    const snapshot = cloneWishlist(wishlist);
    subscribers.forEach((listener) => {
        try {
            listener(snapshot);
        } catch (error) {
            console.error("[wishlistState] Subscriber threw an error.", error);
        }
    });
}

function persist(previousWishlist) {
    try {
        saveWishlist(wishlist);
    } catch (error) {
        console.error(
            "[wishlistState] Failed to persist wishlist. Rolling back.",
            error
        );
        wishlist = previousWishlist;
        return;
    }
    notifySubscribers();
}

export function getWishlist() {
    return cloneWishlist(wishlist);
}

export function getWishlistIds() {
    return wishlist.map(({ id }) => id);
}

export function getWishlistCount() {
    return wishlist.length;
}

export function isInWishlist(productId) {
    return wishlist.some(({ id }) => sameId(id, productId));
}

export function hasWishlistItem(productId) {
    return isInWishlist(productId);
}

export function getWishlistItem(productId) {
    const item = wishlist.find(({ id }) => sameId(id, productId));
    return item ? { ...item } : undefined;
}

export function isWishlistEmpty() {
    return wishlist.length === 0;
}

export function addToWishlist(product) {
    if (!isValidProduct(product)) {
        console.warn("[wishlistState] Invalid product.", product);
        return false;
    }

    if (isInWishlist(product.id)) {
        return false;
    }

    const previousWishlist = [...wishlist];
    wishlist.push({ ...product });
    persist(previousWishlist);
    return true;
}

export function removeFromWishlist(productId) {
    const previousWishlist = [...wishlist];
    wishlist = wishlist.filter(({ id }) => !sameId(id, productId));
    persist(previousWishlist);
}

export function toggleWishlist(product) {
    if (!isValidProduct(product)) {
        console.warn("[wishlistState] Invalid product.", product);
        return false;
    }

    const existingItem = getWishlistItem(product.id);

    if (existingItem) {
        removeFromWishlist(product.id);
        return false;
    }

    addToWishlist(product);
    return true;
}

export function clearWishlist() {
    const previousWishlist = [...wishlist];
    wishlist = [];
    persist(previousWishlist);
    clearWishlistStorage();
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