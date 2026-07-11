import { products } from "../../data/products.js";
import { state } from "../../state/shopState.js";
import { getShopData } from "../../services/shopService.js";
import { renderProductGrid } from "../../components/ProductGrid.js";
import { renderPagination } from "../../components/Pagination.js";
import { setupFilters } from "../../components/FilterBar.js";
import { addToCart } from "../../state/cartState.js";
import { addCompareId } from "../../state/compareState.js";
import { copyProductLink, handleProductCardAction } from "../../handlers/productCardActions.js";
import { updateToolbar } from "../../components/ShopToolbar.js";
import { renderEmptyState } from "../../components/EmptyState.js"


export function createShopController(container) {

    if (!container) {
        throw new Error("Shop container was not found.");
    }

    function getData() {
        return getShopData(products, state);
    }

    function render() {

        const {
            visibleProducts,
            totalProducts,
            totalPages,
        } = getData()


        updateToolbar(totalProducts);

        if (!visibleProducts.length) {

            container.innerHTML =
                renderEmptyState();

            return;

        }


        container.innerHTML = `
    ${renderProductGrid({

            products: visibleProducts,

            viewMode: state.viewMode,

        })}

    ${renderPagination(

            state.currentPage,

            totalPages

        )}
`;

    }

    function goToProduct(id) {

        window.location.href =
            `../singleProduct/singleProduct.html?id=${id}`;

    }

    function goToCompare() {

        window.location.href =
            "../comparisonPage/productComparison.html";

    }

    function changePage(page) {

        if (page === state.currentPage) return;

        state.currentPage = page;

        render();

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    }

    function handlePagination(event) {

        const button =
            event.target.closest(".page-btn");

        if (!button) return false;

        changePage(
            Number(button.dataset.page)
        );

        return true;

    }

    function handleProductActions(event) {

        const handled =
            handleProductCardAction(
                event,
                products,
                {

                    onAddToCart(product) {

                        addToCart(product);

                    },

                    onWishlist(product) {

                        toggleWishlist(product);

                    },

                    onCompare(product) {

                        const result =
                            addCompareId(product.id);

                        if (

                            result.status === "ready" ||

                            result.status === "open"

                        ) {

                            goToCompare();

                        }

                    },

                    onShare(product) {

                        copyProductLink(product);

                    },

                }
            );

        return handled;

    }

    function handleCardNavigation(event) {

        const card =
            event.target.closest(".product-card");

        if (!card) return;

        goToProduct(
            Number(card.dataset.id)
        );

    }

    function handleClick(event) {

        if (handlePagination(event)) return;

        if (handleProductActions(event)) return;

        handleCardNavigation(event);

    }

    function bindFilters() {

        setupFilters({

            onSortChange(sortBy) {

                state.sortBy = sortBy;
                state.currentPage = 1;
                render();

            },

            onPerPageChange(value) {

                state.perPage =
                    value === "All"
                        ? products.length
                        : value;

                state.currentPage = 1;

                render();

            },

            onViewChange(viewMode) {

                state.viewMode = viewMode;
                render();

            },

        });

    }

    function init() {

        bindFilters();

        container.addEventListener(
            "click",
            handleClick
        );

        render();

    }

    return {
        init,
        render,
    };

}