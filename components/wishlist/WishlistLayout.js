import { WishlistHeader } from "./WishlistHeader.js";
import { WishlistEmpty } from "./WishlistEmpty.js";
import { renderProductGrid } from "../ProductGrid.js";

const WRAPPER_CLASS = `
flex
flex-col
gap-14
`;

function trimClassList(classList) {
    return classList
        .split(/\s+/)
        .filter(Boolean)
        .join(" ");
}

export function WishlistLayout({ products = [] } = {}) {
    const safeProducts = Array.isArray(products) ? products : [];

    const content = safeProducts.length
        ? renderProductGrid({
            products: safeProducts,
            viewMode: "grid",
        })
        : WishlistEmpty();

    return `
        <section class="${trimClassList(WRAPPER_CLASS)}">
            ${WishlistHeader({
        totalItems: safeProducts.length,
    })}

            ${content}
        </section>
    `;
}