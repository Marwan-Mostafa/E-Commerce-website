import { WishlistHeader } from "./WishlistHeader.js";
import { WishlistEmpty } from "./WishlistEmpty.js";

import { renderProductGrid } from "../ProductGrid.js";

const WRAPPER_CLASS = `
flex
flex-col
gap-14
`;

export function WishlistLayout({

    products = [],

} = {}) {

    const hasProducts = products.length > 0;

    return `

        <section
            class="${WRAPPER_CLASS}"
            aria-label="Wishlist">

            ${WishlistHeader({

        totalItems: products.length,

    })}

            ${hasProducts

            ? renderProductGrid(products)

            : WishlistEmpty()}

        </section>

    `;

}