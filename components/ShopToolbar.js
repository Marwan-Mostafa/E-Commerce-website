import { state } from "../state/shopState.js";


export function updateToolbar(totalProducts) {

    const result =
        document.querySelector(".shop-toolbar p");

    if (!result) return;

    if (state.perPage === Infinity) {

        result.textContent =
            `Showing 1-${totalProducts} of ${totalProducts} results`;

        return;
    }

    const start =
        (state.currentPage - 1) * state.perPage + 1;

    const end =
        Math.min(
            state.currentPage * state.perPage,
            totalProducts
        );

    result.textContent =
        `Showing ${start}-${end} of ${totalProducts} results`;

}