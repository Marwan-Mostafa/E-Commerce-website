import { ProductGallery } from "./ProductGallery.js";
import { ProductInfo } from "./ProductInfo.js";
import { ProductMeta } from "./ProductMeta.js";

export function ProductDetails(product) {
  return `
    <section class="max-w-[1440px] mx-auto px-8 lg:px-16 py-12 lg:py-16">

      <div class="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">

        ${ProductGallery(product)}

        <div>

          ${ProductInfo(product)}
          ${ProductMeta(product)}

        </div>

      </div>

    </section>
  `;
}