import { renderProductGrid } from "./ProductGrid.js";

const SHOP_ROUTE = "/pages/shop/shop.html";

export function renderHomeProducts({
    products = [],
    title = "Our Products",
    limit = 8,
}) {

    return `
        <section
            aria-labelledby="products-heading"
            class="w-full flex flex-col items-center py-16 px-4">

            <h2
                id="products-heading"
                class="text-4xl font-bold text-gray-800 mb-12">

                ${title}

            </h2>

            ${renderProductGrid({
        products: products.slice(0, limit),
    })}

            <a
                href="${SHOP_ROUTE}"
                class="mt-12 border-2 border-(--primary)
                       text-(--primary)
                       px-10 py-3
                       font-semibold
                       hover:bg-(--primary)
                       hover:text-white
                       transition">

                Show More

            </a>

        </section>
    `
}