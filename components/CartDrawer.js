import { getCart, removeFromCart } from "../../state/cart.js";
import { formatPrice } from "../../utils/formatPrice.js";

const drawer = document.getElementById("cart-drawer");

const overlay = document.getElementById("cart-overlay");

export function openCartDrawer() {
    if (!drawer || !overlay) return;
    drawer.style.right = "0";
    overlay.classList.remove("hidden");
}

export function closeCartDrawer() {
    if (!drawer || !overlay) return;
    drawer.style.right = "-420px";
    overlay.classList.add("hidden");
}

const closeCartBtn = document.getElementById("close-cart");

if (closeCartBtn) {
    closeCartBtn.addEventListener("click", closeCartDrawer);
}

if (overlay) {
    overlay.addEventListener("click", closeCartDrawer);
}

export function renderCartDrawer() {

    const cartItems = document.getElementById("cart-items");

    const cart = getCart();

    cartItems.innerHTML = cart
        .map(item => `
      <div
        class="flex gap-4 mb-6 items-center"
      >

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="w-20 h-20 object-cover rounded-lg"
                />

        <div class="flex-1">

          <h3 class="font-medium">
            ${item.name}
          </h3>

          <p class="text-sm">

            ${item.quantity}
            ×
            ${formatPrice(item.price)}

          </p>

        </div>

                <button
                    type="button"
          class="remove-cart-item"
          data-id="${item.id}"
        >
          ✕
        </button>

      </div>
  `).join("");

    renderSubtotal();
    updateCartBadge();
}


function renderSubtotal() {

    const cart =
        getCart();

    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );

    const subtotalEl = document.getElementById("cart-subtotal");

    if (subtotalEl) {
        subtotalEl.textContent = formatPrice(total);
    }
}


document.addEventListener(
    "click",
    (e) => {

        const removeBtn =
            e.target.closest(
                ".remove-cart-item"
            );

        if (!removeBtn) return;

        removeFromCart(
            Number(
                removeBtn.dataset.id
            )
        );

        renderCartDrawer();
    }
);


export function updateCartBadge() {

    const badge = document.getElementById("cart-badge");

    if (!badge) return;

    const cart = getCart();
    const totalItems = cart.reduce(
        (sum, item) =>
            sum + item.quantity,
        0
    );

    badge.textContent = totalItems;

    if (totalItems > 0) {
        badge.classList.remove("hidden");
    } else {
        badge.classList.add("hidden");
    }
}