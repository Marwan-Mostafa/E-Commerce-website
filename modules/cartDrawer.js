import { getCart, removeFromCart } from "../../state/cartState.js";
import { formatPrice } from "../../utils/formatPrice.js";

export function setupCartDrawer() {

    const drawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("cart-overlay");
    const closeBtn = document.getElementById("close-cart");

    if (!drawer || !overlay) return;

    closeBtn?.addEventListener("click", closeCartDrawer);
    overlay.addEventListener("click", closeCartDrawer);

    document.addEventListener("click", (e) => {

        const removeBtn = e.target.closest(".remove-cart-item");

        if (!removeBtn) return;

        removeFromCart(Number(removeBtn.dataset.id));

        renderCartDrawer();
    });

    updateCartBadge();
}

export function openCartDrawer() {

    const drawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("cart-overlay");

    if (!drawer || !overlay) return;

    drawer.style.right = "0";
    overlay.classList.remove("hidden");
}

export function closeCartDrawer() {

    const drawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("cart-overlay");

    if (!drawer || !overlay) return;

    drawer.style.right = "-420px";
    overlay.classList.add("hidden");
}

export function renderCartDrawer() {

    const cartItems = document.getElementById("cart-items");

    if (!cartItems) return;

    const cart = getCart();

    cartItems.innerHTML = cart.map(item => `
    <div class="flex gap-4 mb-6 items-center">

      <img
        src="${item.image}"
        alt="${item.name}"
        class="w-20 h-20 object-cover rounded-lg"
      />

      <div class="flex-1">

        <h3 class="font-medium">
          ${item.name}
        </h3>

        <p class="text-sm text-gray-500">
          ${item.quantity} × ${formatPrice(item.price)}
        </p>

      </div>

      <button
        class="remove-cart-item text-xl hover:text-red-500 transition"
        data-id="${item.id}">

        ×

      </button>

    </div>
  `).join("");

    renderSubtotal();
    updateCartBadge();
}

function renderSubtotal() {

    const subtotal = document.getElementById("cart-subtotal");

    if (!subtotal) return;

    const total = getCart().reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    subtotal.textContent = formatPrice(total);
}

export function updateCartBadge() {

    const badge = document.getElementById("cart-badge");

    if (!badge) return;

    const totalItems = getCart().reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);

    badge.textContent = totalItems;

    badge.classList.toggle("hidden", totalItems === 0);
}