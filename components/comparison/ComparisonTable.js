import { SPEC_GROUPS } from "./comparisonConstants.js"
import { ComparisonGroup } from "./ComparisonGroup.js"

export function ComparisonTable(products = []) {

  if (!products.length) return ""

  const gridColumns = `
    260px repeat(${products.length}, minmax(260px, 1fr))
  `;

  return `
    <section class="w-full mt-16 overflow-x-auto">

      <div
        class="grid min-w-fit"
        style="grid-template-columns:${gridColumns};">

        ${SPEC_GROUPS
      .map((group) =>
        ComparisonGroup({
          group,
          products,
        })
      )
      .join("")}

        ${renderActionsRow(products)}

      </div>

    </section>
  `;
}

function renderActionsRow(products) {

  return `
    <div class="py-8"></div>

    ${products
      .map(
        (product) => `
          <div class="flex justify-center py-8">

            <button
              type="button"
              class="
                comparison-add-to-cart-btn
                w-full
                max-w-[220px]
                py-3
                bg-[#B88E2F]
                text-white
                rounded-md
                font-medium
                cursor-pointer
                transition-all
                duration-300
                hover:bg-[#9F7A29]
                active:scale-95
              "
              data-product-id="${product.id}">

              Add To Cart

            </button>

          </div>
        `
      )
      .join("")}
  `;
}