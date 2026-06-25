import { getCart, removeFromCart } from "../../state/cart.js";
import { formatPrice } from "../../utils/formatPrice.js";

const drawer = document.getElementById("cart-drawer");

const overlay = document.getElementById("cart-overlay");

export function openCartDrawer() {
    drawer.style.right = "0";
    overlay.classList.remove("hidden");
}

export function closeCartDrawer() {
    drawer.style.right = "-420px";
    overlay.classList.add("hidden");
}

document.getElementById("close-cart").addEventListener("click", closeCartDrawer);

overlay.addEventListener(
    "click",
    closeCartDrawer
);

export function renderCartDrawer() {

    const cartItems =
        document.getElementById(
            "cart-items"
        );

    const cart =
        getCart();

    cartItems.innerHTML = cart
        .map(item => `
      <div
        class="flex gap-4 mb-6 items-center"
      >

        <img
          src="${item.image}"
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
          class="remove-cart-item"
          data-id="${item.id}"
        >
          ✕
        </button>

      </div>
  `).join("");

    renderSubtotal();
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

    document.getElementById(
        "cart-subtotal"
    ).textContent =
        formatPrice(total);
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