import { renderNavbar } from "../../components/Navbar.js";
import { renderFooter } from "../../components/Footer.js";
import { renderFeaturesSection } from "../../components/FeaturesSection.js";
import { WishlistLayout } from "../../components/wishlist/WishlistLayout.js";
import { setupWishlistBadge } from "../../modules/navbar/wishlistBadge.js";
import {
    getWishlist,
    removeFromWishlist,
    subscribeWishlist,
} from "../../state/wishlistState.js";

function setHtml(rootId, html) {
    const root = document.getElementById(rootId);

    if (!root) {
        console.warn(`[wishlist] Missing root element: #${rootId}`);
        return;
    }

    root.innerHTML = html;
}

function renderLayout() {
    setHtml("navbar-root", renderNavbar("wishlist"));
    setHtml("features-root", renderFeaturesSection());
    setHtml("footer-root", renderFooter());
}

function renderWishlist() {
    const products = getWishlist();
    setHtml("wishlist-root", WishlistLayout({ products }));
}

function handleClick(event) {
    const removeButton = event.target.closest('[data-action="wishlist"]');

    if (!removeButton) {
        return;
    }

    const productId = Number(removeButton.dataset.id);

    if (!Number.isInteger(productId) || productId <= 0) {
        console.warn(
            `[wishlist] Invalid product id on remove button: "${removeButton.dataset.id}".`
        );
        return;
    }

    removeFromWishlist(productId);
}

function bindEvents() {
    const wishlistRoot = document.getElementById("wishlist-root");

    if (!wishlistRoot) {
        console.warn("[wishlist] Missing root element: #wishlist-root");
        return;
    }

    wishlistRoot.addEventListener("click", handleClick);
}

function bootstrap() {
    renderLayout();
    renderWishlist();
    bindEvents();
    setupWishlistBadge();
    subscribeWishlist(renderWishlist);
}

bootstrap();