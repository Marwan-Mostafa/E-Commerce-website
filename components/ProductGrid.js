import { renderProductCard } from "./ProductCard.js";

export function renderProductGrid({
    products = [],
    viewMode = "grid",
    emptyMessage = "No products found.",
} = {}) {

    if (!products.length) {
        return `
            <div class="py-20 text-center">
                <h2 class="text-2xl font-bold">
                    ${emptyMessage}
                </h2>
            </div>
        `;
    }

    const layoutClasses =
        viewMode === "list"
            ? "flex flex-col gap-8"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8";

    return `
        <div class="${layoutClasses}">
            ${products
            .map(product => renderProductCard(product))
            .join("")}
        </div>
    `;
}