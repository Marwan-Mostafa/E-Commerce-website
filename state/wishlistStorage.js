import { STORAGE_KEY } from "./wishlistStorage.js";

export function loadWishlist() {

    try {

        const data = localStorage.getItem(

            STORAGE_KEY

        );

        return data

            ? JSON.parse(data)

            : [];

    }

    catch (error) {

        console.error(

            "[wishlistStorage] Failed to load wishlist.",

            error

        );

        return [];

    }

}

export function saveWishlist(wishlist) {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(wishlist)

    );

}