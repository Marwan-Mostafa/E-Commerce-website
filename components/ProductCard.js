import { formatPrice } from "../utils/formatPrice.js";
import { isInWishlist } from "../state/wishlistState.js";


const ACTION_BUTTON_CLASS = `
cursor-pointer
hover:text-gray-700
transition-all
duration-300
hover:-translate-y-1
active:scale-90
`
const ACTION_LABELS = {
  wishlist: "Like",
  compare: "Compare",
  share: "Share",
};


function renderDiscountBadge(discount) {
  if (!discount) return ""

  return `
        <div
            class="absolute top-3 right-3 bg-[#E97171] text-white text-md w-[48px] px-1 p-3 font-semibold rounded-full bg-[#E97171] text-white font-semibold"
            aria-label="${discount} off">
            ${discount}
        </div>
    `
}

function renderOldPrice(oldPrice) {
  if (!oldPrice) return ""

  return `
        <span class="text-gray-400 line-through text-sm">
            ${formatPrice(oldPrice)}
        </span>
    `
}

function renderActionButton({
  action,
  icon,
  label,
  productId,
  pressed = null,
}) {

  const ariaPressed =
    pressed === null
      ? ""
      : `aria-pressed="${pressed}"`

  return `
        <button
            type="button"
            class="${ACTION_BUTTON_CLASS}"
            aria-label="${label}"
            data-action="${action}"
            data-id="${productId}"
            ${ariaPressed}
        >
            <i class="${icon}"></i>
           ${buttonText[action]}

        </button>
    `
}



export function renderProductCard(product) {

  const {
    id,
    name,
    image,
    category,
    price,
    oldPrice,
    discount,
  } = product

  const formattedPrice = formatPrice(price);

  const wishlistActive = isInWishlist(id);

  const wishlistIcon = wishlistActive ? "fa-solid fa-heart" : "fa-regular fa-heart";

  return `
      <article
      class="group product-card bg-white shadow-sm hover:shadow-xl transition duration-500 overflow-hidden cursor-pointer"
      data-id="${id}">

      <div class="relative overflow-hidden cursor-pointer" data-action="view-product" data-id="${id}">

      <img
      src="${image}"
      alt="${name}"
      loading="lazy"
      decoding="async"
      class="w-full aspect-square object-cover group-hover:scale-110 transition duration-700 pointer-events-none"/>

      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition"></div>

          ${renderDiscountBadge(discount)}

          <div class="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition">

          <button
          type="button"
          class="add-to-cart-btn bg-white px-10 py-2 text-sm font-semibold text-(--primary)
          cursor-pointer duration-300 transition-all hover:shadow-black/20 hover:-translate-y-1 active:scale-90"
          aria-label="View ${name}"
          data-action="add-to-cart"
          data-id="${id}">

          Add to cart
          </button>

          <div class="flex gap-4 mt-4 text-white text-sm font-semibold">

          ${renderActionButton({
    action: "share",
    icon: "fa-solid fa-share-nodes",
    label: `Share ${name}`,
    productId: id,
  })}

          ${renderActionButton({
    action: "compare",
    icon: "fa-solid fa-arrow-right-arrow-left",
    label: `Compare ${name}`,
    productId: id,
  })}

          ${renderActionButton({
    action: "wishlist",
    icon: wishlistIcon,
    label: `Add ${name} to wishlist`,
    productId: id,
    pressed: wishlistActive,
  })}

          </div>

          </div>

          </div>

          <div class="p-4 bg-gray-50">

            <h3  class="font-semibold text-lg cursor-pointer hover:text-(--primary) transition-colors"
                    data-action="view-product"
                    data-id="${id}">
            ${name}
            </h3>

            <p class="text-sm text-gray-500 font-semibold">
            ${category}
            </p>

            <div class="mt-3 flex items-center gap-3">

            <span class="font-bold text-lg text-gray-900">
            ${formattedPrice}
            </span>

            ${renderOldPrice(oldPrice)}

          </div>

          </div>

          </article>
          `
}