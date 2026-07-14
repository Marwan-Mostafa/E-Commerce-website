import { products } from "../../data/products.js";
import { renderProductCard } from "../../components/ProductCard.js";
import {
    handleProductCardAction,
    copyProductLink,
    navigateToProduct,
} from "../../handlers/productCardActions.js";
import { toggleWishlist } from "../../state/wishlistState.js";
import { addCompareId } from "../../state/compareState.js";
import { addToCart } from "../../state/cartState.js";

const PAGE_SIZE = 8;


export function initProductGrid(rootId = "products-root", options = {}) {
    const { onProductActionError } = options;

    const root = document.getElementById(rootId);

    if (!root || root.dataset.productGridBound === "true") {
        return;
    }

    root.dataset.productGridBound = "true";

    const grid = root.querySelector("#product-grid-list");
    const showMoreButton = root.querySelector("#show-more-btn");

    bindProductActions(root, onProductActionError);
    bindShowMoreButton(showMoreButton, grid);
}


function bindProductActions(root, onProductActionError) {
    root.addEventListener("click", (event) => {
        try {
            handleProductCardAction(event, products, {
                onView(product) {
                    navigateToProduct(product.id);
                },
                onAddToCart(product) {
                    addToCart({ ...product, quantity: 1 });
                },
                onWishlist(product) {
                    const added = toggleWishlist(product);
                    updateWishlistButton(event, added);
                },
                onCompare(product) {
                    addCompareId(product.id);
                },
                onShare(product) {
                    copyProductLink(product);
                },
            });
        } catch (error) {
            console.error(
                "[productGridController] Failed to handle product card action.",
                error
            );

            if (typeof onProductActionError === "function") {
                onProductActionError(error);
            }
        }
    });
}


function updateWishlistButton(event, isWishlisted) {
    const button = event.target.closest('[data-action="wishlist"]');

    if (!button) {
        return;
    }

    button.setAttribute("aria-pressed", String(isWishlisted));

    const icon = button.querySelector("i");

    if (!icon) {
        return;
    }

    icon.classList.remove("fa-solid", "fa-regular");
    icon.classList.add(isWishlisted ? "fa-solid" : "fa-regular", "fa-heart");
}


function bindShowMoreButton(button, grid) {
    if (!button || !grid) {
        return;
    }

    button.addEventListener("click", () => {
        renderNextProducts(button, grid);
    });
}


function getVisibleCount(grid) {
    const parsedVisibleCount = Number(grid.dataset.visibleCount);

    return Number.isFinite(parsedVisibleCount) ? parsedVisibleCount : PAGE_SIZE;
}


function renderNextProducts(button, grid) {
    const visibleCount = getVisibleCount(grid);

    const nextProducts = products.slice(visibleCount, visibleCount + PAGE_SIZE);

    grid.insertAdjacentHTML(
        "beforeend",
        nextProducts.map(renderProductCard).join("")
    );

    const nextVisibleCount = visibleCount + nextProducts.length;
    grid.dataset.visibleCount = String(nextVisibleCount);

    if (nextVisibleCount >= products.length) {
        button.remove();
    }
}