import { products } from "../../data/products.js";

import { renderProductCard } from "../../components/ProductCard.js";

import {
    handleProductCardAction,
    copyProductLink,
    navigateToProduct,
} from "../../handlers/productCardActions.js";

import { toggleWishlist } from "../../state/wishlistState.js";
import { addCompareId } from "../../state/compareState.js";

const PAGE_SIZE = 8;

export function initProductGrid(rootId = "products-root") {

    const root = document.getElementById(rootId);

    if (!root) {

        return;

    }

    const grid =
        root.querySelector("#product-grid-list");

    const showMoreButton =
        root.querySelector("#show-more-btn");

    bindProductActions(root);

    bindShowMoreButton(

        showMoreButton,

        grid

    );

}


function bindProductActions(root) {

    root.addEventListener(

        "click",

        (event) => {

            handleProductCardAction(

                event,

                products,

                {

                    onView(product) {

                        navigateToProduct(

                            product.id

                        );

                    },

                    onAddToCart(product) {

                        navigateToProduct(

                            product.id

                        );

                    },

                    onWishlist(product) {

                        const added =

                            toggleWishlist(

                                product

                            );

                        updateWishlistButton(

                            event,

                            added

                        );

                    },

                    onCompare(product) {

                        addCompareId(

                            product.id

                        );

                    },

                    onShare(product) {

                        copyProductLink(

                            product

                        );

                    },

                }

            );

        }

    );

}


function updateWishlistButton(

    event,

    isWishlisted

) {

    const button =

        event.target.closest(

            '[data-action="wishlist"]'

        );

    if (!button) {

        return;

    }

    button.setAttribute(

        "aria-pressed",

        String(isWishlisted)

    );

    const icon =

        button.querySelector("i");

    if (!icon) {

        return;

    }

    icon.classList.remove(

        "fa-solid",

        "fa-regular"

    );

    icon.classList.add(

        isWishlisted

            ? "fa-solid"

            : "fa-regular",

        "fa-heart"

    );

}


function bindShowMoreButton(

    button,

    grid

) {

    if (!button || !grid) {

        return;

    }

    button.addEventListener(

        "click",

        () => {

            renderNextProducts(

                button,

                grid

            );

        }

    );

}

function renderNextProducts(

    button,

    grid

) {

    const visibleCount = Number(

        grid.dataset.visibleCount

    );

    const nextProducts =

        products.slice(

            visibleCount,

            visibleCount +

            PAGE_SIZE

        );

    grid.insertAdjacentHTML(

        "beforeend",

        nextProducts

            .map(renderProductCard)

            .join("")

    );

    const nextVisibleCount =

        visibleCount +

        nextProducts.length;

    grid.dataset.visibleCount =

        String(nextVisibleCount);

    if (

        nextVisibleCount >=

        products.length

    ) {

        button.remove();

    }

}