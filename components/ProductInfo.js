import { formatPrice } from "../utils/formatPrice.js";
import { ProductSizeSelector } from "./ProductSizeSelector.js";

export function ProductInfo(product) {
  return `
    <div class="flex flex-col gap-5">

      <div>
        <h1
          id="product-name"
          class="font-montserrat text-3xl lg:text-4xl font-semibold text-dark leading-tight">
          ${product.name}
        </h1>

        <p
          id="product-price"
          class="text-mid text-xl font-medium mt-2">
          ${formatPrice(product.price)}
        </p>
      </div>

      <div class="flex items-center gap-3">
        <div class="flex gap-0.5">
          <span class="star">★</span>
          <span class="star">★</span>
          <span class="star">★</span>
          <span class="star">★</span>
          <span class="star" style="color:#FFDA5F88">★</span>
        </div>

        <span class="text-mid text-sm">|</span>

        <span class="text-mid text-sm">
          5 Customer Reviews
        </span>
      </div>

      <p class="text-dark/70 text-sm leading-relaxed max-w-sm">
        ${product.description ?? ""}
      </p>

      <div>

        <p class="text-sm font-medium text-mid mb-2.5">
          Size
        </p>

        <div id="size-group"></div>

      </div>

      <div>

        <p class="text-sm font-medium text-mid mb-2.5">
          Color
        </p>

        <div id="color-group"></div>

      </div>

      <div class="flex flex-wrap items-center gap-3 pt-2">

      <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden">

          <button
            id="decrease-qty"
            type="button"
            class="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition">

            -

          </button>

          <input
            id="qty-input"
            type="text"
            value="1"
            readonly
            class="w-14 text-center outline-none font-medium bg-white"
          />

          <button
            id="increase-qty"
            type="button"
            class="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition">

            +

          </button>

          </div>

        <button
          id="add-to-cart-btn"
          class="flex-1 sm:flex-none px-8 py-3 bg-dark text-white text-sm font-semibold rounded-lg hover:bg-gold transition-colors duration-200 min-w-[160px]">

          Add To Cart

        </button>

        <button
          id="compare-btn"
          class="flex-1 sm:flex-none px-6 py-3 border border-dark text-dark text-sm font-semibold rounded-lg hover:border-gold hover:text-gold transition-colors min-w-[140px]">

          + Compare

        </button>

      </div>

    </div>
  `;
}