import { renderProductGrid } from "./ProductGrid.js";

const MAX_RELATED_PRODUCTS = 4;

export function RelatedProducts(currentProduct, products) {

  let relatedProducts = products.filter((product) => {
    return (
      product.category === currentProduct.category &&
      product.id !== currentProduct.id
    );
  });

  if (relatedProducts.length < MAX_RELATED_PRODUCTS) {

    const remainingProducts = products.filter((product) => {
      return (
        product.id !== currentProduct.id &&
        !relatedProducts.some((item) => item.id === product.id)
      );
    });

    relatedProducts = [
      ...relatedProducts,
      ...remainingProducts,
    ];
  }

  relatedProducts = relatedProducts.slice(0, MAX_RELATED_PRODUCTS);

  return `
    <section class="w-full flex justify-center py-16 px-4">

      <div class="w-full max-w-6xl">

        <h2
          class="text-center text-3xl font-bold mb-10">

          Related Products

        </h2>

        ${renderProductGrid(relatedProducts)}

        <div class="flex justify-center mt-10">

          <button
            id="show-more-btn"
            class="
              border
              border-yellow-700
              text-yellow-700
              px-10
              py-3
              font-semibold
              transition-all
              duration-300
              hover:bg-yellow-700
              hover:text-white
              hover:-translate-y-1
              active:scale-95">

            Show More

          </button>

        </div>

      </div>

    </section>
  `;
}