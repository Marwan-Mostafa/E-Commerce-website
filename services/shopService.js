import { paginate, getTotalPages } from "../utils/paginate.js";
import { sortProducts } from "../utils/sortProducts.js";

export function getShopData(products, state) {

    const filteredProducts = [...products];

    const sortedProducts =
        sortProducts(filteredProducts, state.sortBy);

    const visibleProducts =
        paginate(
            sortedProducts,
            state.currentPage,
            state.perPage
        );

    return {

        sortedProducts,

        visibleProducts,

        totalProducts:
            sortedProducts.length,

        totalPages:
            getTotalPages(
                sortedProducts,
                state.perPage
            ),

    };

}