import { formatPrice } from "../utils/formatPrice.js";
import { isInWishlist } from "../state/wishlistState.js";

const SINGLE_PRODUCT_PAGE_PATH = "../singleProduct/singleProduct.html";

const ACTION_BUTTON_CLASS = `
cursor-pointer
hover:text-gray-700
transition
duration-300
hover:-translate-y-1
active:scale-90
`;

const ACTION_LABELS = {
  wishlist: "Like",
  compare: "Compare",
  share: "Share",
};


const PRODUCT_ACTIONS = {
  viewProduct: "view-product",
  addToCart: "add-to-cart",
};

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return char;
    }
  });
}


function trimClassList(classList) {
  return classList.split(/\s+/).filter(Boolean).join(" ");
}

function buildSingleProductUrl(id) {
  return `${SINGLE_PRODUCT_PAGE_PATH}?id=${encodeURIComponent(id)}`;
}

function renderDiscountBadge(discount) {
  if (!discount) return "";

  const safeDiscount = escapeHtml(discount);

  return `
        <div
            class="absolute top-3 right-3 bg-[#E97171] text-white text-md min-w-[48px] px-1 p-3 font-semibold rounded-full"
            aria-label="${safeDiscount} off">
            ${safeDiscount}
        </div>
    `;
}


function renderOldPrice(oldPrice, price) {
  if (!oldPrice || oldPrice <= price) return "";

  return `
        <span class="text-gray-400 line-through text-sm">
            ${formatPrice(oldPrice)}
        </span>
    `;
}


function renderActionButton({
  action,
  icon,
  label,
  productId,
  pressed = null,
}) {
  const ariaPressed = pressed === null ? "" : `aria-pressed="${pressed}"`;

  return `
        <button
            type="button"
            class="${trimClassList(ACTION_BUTTON_CLASS)}"
            aria-label="${escapeHtml(label)}"
            data-action="${action}"
            data-id="${escapeHtml(productId)}"
            ${ariaPressed}
        >
            <i class="${icon}"></i>
           ${ACTION_LABELS[action]}

        </button>
    `;
}

function renderProductMedia({ safeId, safeName, safeImage, productUrl, discount }) {
  return `
      <a
      href="${productUrl}"
      class="block cursor-pointer"
      data-action="${PRODUCT_ACTIONS.viewProduct}"
      data-id="${safeId}"
      aria-label="View ${safeName}">

      <img
      src="${safeImage}"
      alt="${safeName}"
      loading="lazy"
      decoding="async"
      class="w-full aspect-square object-cover group-hover:scale-110 transition duration-700 pointer-events-none"/>

      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition"></div>

      </a>

      ${renderDiscountBadge(discount)}
  `;
}


function renderQuickActions({
  id,
  safeId,
  safeName,
  wishlistIcon,
  wishlistLabel,
  wishlistActive,
}) {
  return `
      <div class="absolute inset-0 flex flex-col items-center justify-center opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto transition">

      <button
      type="button"
      class="add-to-cart-btn bg-white px-10 py-2 text-sm font-semibold text-(--primary)
      cursor-pointer duration-300 transition hover:shadow-black/20 hover:-translate-y-1 active:scale-90"
      aria-label="View ${safeName}"
      data-action="${PRODUCT_ACTIONS.addToCart}"
      data-id="${safeId}">

      Add to cart
      </button>

      <div class="flex gap-4 mt-4 text-white text-sm font-semibold">

      ${renderActionButton({
    action: "share",
    icon: "fa-solid fa-share-nodes",
    label: `Share ${safeName}`,
    productId: id,
  })}

      ${renderActionButton({
    action: "compare",
    icon: "fa-solid fa-arrow-right-arrow-left",
    label: `Compare ${safeName}`,
    productId: id,
  })}

      ${renderActionButton({
    action: "wishlist",
    icon: wishlistIcon,
    label: wishlistLabel,
    productId: id,
    pressed: wishlistActive,
  })}

      </div>

      </div>
  `;
}


function renderProductInfo({
  safeId,
  safeName,
  safeCategory,
  productUrl,
  formattedPrice,
  oldPrice,
  price,
}) {
  return `
      <div class="p-4 bg-gray-50">

        <h3 class="font-semibold text-lg">
        <a
            href="${productUrl}"
            class="hover:text-(--primary) transition-colors"
            data-action="${PRODUCT_ACTIONS.viewProduct}"
            data-id="${safeId}">
        ${safeName}
        </a>
        </h3>

        <p class="text-sm text-gray-500 font-semibold">
        ${safeCategory}
        </p>

        <div class="mt-3 flex items-center gap-3">

        <span class="font-bold text-lg text-gray-900">
        ${formattedPrice}
        </span>

        ${renderOldPrice(oldPrice, price)}

      </div>

      </div>
  `;
}


export function renderProductCard(product) {
  const { id, name, image, category, price, oldPrice, discount } = product;

  const safeId = escapeHtml(id);
  const safeName = escapeHtml(name);
  const safeCategory = escapeHtml(category);
  const safeImage = escapeHtml(image);
  const productUrl = buildSingleProductUrl(id);

  const formattedPrice = formatPrice(price);

  const wishlistActive = isInWishlist(id);

  const wishlistIcon = wishlistActive
    ? "fa-solid fa-heart"
    : "fa-regular fa-heart";

  const wishlistLabel = wishlistActive
    ? `Remove ${safeName} from wishlist`
    : `Add ${safeName} to wishlist`;

  return `
      <article
      class="group product-card bg-white shadow-sm hover:shadow-xl transition duration-500 overflow-hidden"
      data-id="${safeId}">

      <div class="relative overflow-hidden">

      ${renderProductMedia({ safeId, safeName, safeImage, productUrl, discount })}

      ${renderQuickActions({
    id,
    safeId,
    safeName,
    wishlistIcon,
    wishlistLabel,
    wishlistActive,
  })}

      </div>

      ${renderProductInfo({
    safeId,
    safeName,
    safeCategory,
    productUrl,
    formattedPrice,
    oldPrice,
    price,
  })}

      </article>
          `;
}