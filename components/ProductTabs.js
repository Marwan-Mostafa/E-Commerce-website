import { ProductDescription } from "./ProductDescription.js";
import { ProductAdditionalInfo } from "./ProductAdditionalInfo.js";
import { ProductReviews } from "./ProductReviews.js";

const TAB_CLASS = `
tab-btn
relative
pb-3
text-lg
font-medium
text-[#9F9F9F]
transition-all
duration-300
hover:text-black
`;

export function ProductTabs(product) {
  return `
    <section class="max-w-[1440px] mx-auto py-16">

      <hr class="border-[#E8E8E8] mb-12">

      <div
        id="tabs"
        class="flex justify-center flex-wrap gap-12 mb-12">

        <button
          class="${TAB_CLASS} active cursor-pointer"
          data-tab="description">

          Description

        </button>

        <button
          class="${TAB_CLASS} cursor-pointer"
          data-tab="additional">

          Additional Information

        </button>

        <button
          class="${TAB_CLASS} cursor-pointer"
          data-tab="reviews">

          Reviews (${product.reviews ?? 0})

        </button>

      </div>

      <div
        id="tab-description"
        class="tab-content">

        ${ProductDescription(product)}

      </div>

      <div
        id="tab-additional"
        class="tab-content hidden">

        ${ProductAdditionalInfo(product)}

      </div>

      <div
        id="tab-reviews"
        class="tab-content hidden">

        ${ProductReviews(product)}

      </div>

    </section>
  `;
}