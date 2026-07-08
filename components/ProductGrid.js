import { ProductCard } from './ProductCard.js'

const DEFAULT_TITLE = "Our Products"
const SHOP_ROUTE = "/pages/shop/shop.html"
const DEFAULT_PREVIEW_LIMIT = 8

export function renderProductGrid({
  products = [],
  title = DEFAULT_TITLE,
  limit = DEFAULT_PREVIEW_LIMIT,
  showMore = true,
} = {}) {

  const previewProducts = products.slice(0, limit);

  return `
        <section aria-labelledby="products-heading"
            class="w-full flex flex-col items-center gap-15 py-10 px-4 mt-25">

            <h2 id="products-heading" class="font-bold text-2xl md:text-3xl text-gray-800">
                ${title}
            </h2>
            ${previewProducts.length
      ? `
                    <div class="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        ${previewProducts
        .map(product => ProductCard(product))
        .join("")}
                    </div>
                `
      : `
                    <div class="py-20 text-center text-gray-500">
                        No products available.
                    </div>
                `
    }

            ${showMore
      ? `
                    <a href="${SHOP_ROUTE}"
                        class="border-2 border-(--primary)
                               text-(--primary)
                               font-semibold
                               px-10 py-3
                               text-center
                               hover:bg-(--primary)
                               hover:text-white
                               transition
                               duration-300
                               focus-visible:outline-none
                               focus-visible:ring-2
                               focus-visible:ring-(--primary)
                               focus-visible:ring-offset-2">
                        Show More
                    </a>`
      : ""
    }
        </section>
    `
}