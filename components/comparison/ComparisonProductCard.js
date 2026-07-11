import { formatPrice } from "../../utils/formatPrice.js";
import { products } from "../../data/products.js";
import { ProductSelector } from "./ProductSelector.js";

function renderStars(rating) {

  const fullStars = Math.round(rating);

  return Array.from(
    { length: 5 },
    (_, index) => `
      <i
        class="
          fa-solid fa-star
          ${index < fullStars
        ? "text-[#FFC700]"
        : "text-[#D9D9D9]"
      }
        ">
      </i>
    `
  ).join("");

}

export function ComparisonProductCard(product = {}, slot = 0) {

  if (!product.id) return "";

  return `
    <article
      class="w-[400px] flex flex-col">

      <div
        class="
          bg-[#F9F1E7]
          rounded-xl
          overflow-hidden
          aspect-square
          flex
          items-center
          justify-center
          p-5
        ">

        <img
          src="${product.image}"
          alt="${product.name}"
          class="
            w-full
            h-full
            object-contain
          ">

      </div>

      <h3
        class="
          mt-4
          text-2xl
          font-semibold
        ">

        ${product.name}

      </h3>

      <p
        class="
          mt-2
          text-lg
          font-medium
        ">

        ${formatPrice(product.price)}

      </p>

      <div
        class="
          flex
          items-center
          gap-2
          mt-2
        ">

        <span>${product.rating}</span>

        <div class="flex gap-1">

          ${renderStars(product.rating)}

        </div>

        <span class="text-[#9F9F9F]">|</span>

        <span
          class="
            text-sm
            text-[#9F9F9F]
          ">

          ${product.reviews} Reviews

        </span>

      </div>

      ${ProductSelector(
    product.id,
    products,
    slot
  )}

    </article>
  `;
}