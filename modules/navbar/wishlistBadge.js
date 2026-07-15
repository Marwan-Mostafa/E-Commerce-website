import {
    getWishlistCount,
    subscribeWishlist,
} from "../../state/wishlistState.js";

export function setupWishlistBadge() {
    const badge = document.getElementById("wishlist-count");

    if (!badge) {
        return;
    }

    if (badge.dataset.wishlistBadgeBound === "true") {
        return;
    }

    badge.dataset.wishlistBadgeBound = "true";

    renderBadge(badge);

    subscribeWishlist(() => {
        renderBadge(badge);
    });
}

function renderBadge(badge) {
    const count = getWishlistCount();

    badge.textContent = count;

    badge.classList.toggle("hidden", count === 0);
}