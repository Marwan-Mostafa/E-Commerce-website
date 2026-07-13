import { products } from '../../data/products.js';
import { renderProductCard } from '../../components/ProductCard.js';
import { handleProductCardAction, copyProductLink } from '../../handlers/productCardActions.js';
import { addToCart } from '../../state/cartState.js';
import { addCompareId } from '../../state/compareState.js';
import { setupFilters } from '../../state/wishlistState.js';

const PAGE_SIZE = 8;
function navigateToProduct(productId) {
    window.location.href = `/pages/singleProduct/singleProduct.html?id=${productId}`;
}

export function initProductGrid(rootId = "products-root") {

    const root = document.getElementById(rootId);

    if (!root) {

        return;

    }

    const grid =
        root.querySelector("#product-grid-list");

    const showMoreBtn =
        root.querySelector("#show-more-btn");

    root.addEventListener("click", (event) => {

        handleProductCardAction(

            event,

            products,

            {

                onViewProduct(product) {

                    navigateToProduct(product.id);

                },

                onAddToCart(product) {

                    navigateToProduct(product.id);

                },

                onWishlist(product) {

                    setupFilters(product);

                },

                onCompare(product) {

                    addCompareId(product.id);

                },

                onShare(product) {

                    copyProductLink(product);

                },

            }

        );

    });

    showMoreBtn?.addEventListener("click", () => {

        const currentCount = Number(

            grid.dataset.visibleCount

        );

        const nextBatch = products.slice(

            currentCount,

            currentCount + PAGE_SIZE

        );

        grid.insertAdjacentHTML(

            "beforeend",

            nextBatch

                .map(renderProductCard)

                .join("")

        );

        const nextCount =

            currentCount +

            nextBatch.length;

        grid.dataset.visibleCount =

            String(nextCount);

        if (nextCount >= products.length) {

            showMoreBtn.remove();

        }

    });

}