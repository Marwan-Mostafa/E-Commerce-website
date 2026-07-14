import { WishlistHeader } from "./WishlistHeader.js";
import { WishlistEmpty } from "./WishlistEmpty.js";
import { renderProductGrid } from "../ProductGrid.js";

const WRAPPER_CLASS = `
flex
flex-col
gap-14
`;


function trimClassList(classList) {
    return classList.split(/\s+/).filter(Boolean).join(" ");
}


export function WishlistLayout({ products = [] } = {}) {
    const safeProducts = Array.isArray(products) ? products : [];
    const hasProducts = safeProducts.length > 0;

    return `
        <section class="${trimClassList(WRAPPER_CLASS)}">
            ${WishlistHeader({ totalItems: safeProducts.length })}
            ${hasProducts ? renderProductGrid(safeProducts) : WishlistEmpty()}
        </section>
    `;
}