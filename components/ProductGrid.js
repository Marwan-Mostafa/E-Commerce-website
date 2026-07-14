import { renderProductCard } from "./ProductCard.js";

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export function renderProductGrid({
    products = [],
    viewMode = "grid",
    emptyMessage = "No products found.",
} = {}) {
    const safeProducts = Array.isArray(products) ? products : [];

    if (!safeProducts.length) {
        return `
            <div class="py-20 text-center">
                <h2 class="text-2xl font-bold">
                    ${escapeHtml(emptyMessage)}
                </h2>
            </div>
        `;
    }

    const layoutClasses = viewMode === "list"
        ? "flex flex-col gap-8"
        : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8";

    return `
        <div class="${layoutClasses}">
            ${safeProducts.map(product => renderProductCard(product)).join("")}
        </div>
    `;
}