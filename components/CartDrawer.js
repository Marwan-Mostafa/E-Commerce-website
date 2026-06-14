/**
 * ============================================================
 *  components/CartDrawer.js
 *  PURPOSE: Slide-in cart sidebar triggered by cart icon click.
 *
 *  PATTERN: Drawer/Sidebar — common in e-commerce UX.
 *  Opens from the right, shows cart items, subtotal, checkout CTA.
 *
 *  LISTENS TO: "cartUpdated" custom event from cart.js
 *  This means CartDrawer auto-updates whenever any component
 *  calls addToCart() or removeFromCart() — no direct coupling.
 * ============================================================
 */

import { getCart, removeFromCart, getCartCount } from "../state/cart.js";
import { formatPrice } from "../utils/formatPrice.js";

let drawerOpen = false;

/**
 * initCartDrawer()
 * Creates drawer HTML, appends to body, binds cart icon + events.
 */
export function initCartDrawer() {
  injectDrawerHTML();
  bindCartIcon();
  bindCartUpdatedEvent();
  updateCartBadge();
}

// ── HTML INJECTION ─────────────────────────────────────────────

function injectDrawerHTML() {
  if (document.getElementById("cart-drawer")) return; // Already exists

  const drawerHTML = `
    <!-- OVERLAY: dimmed background behind drawer -->
    <div
      id="cart-overlay"
      class="
        fixed inset-0 bg-black/50 z-40
        opacity-0 pointer-events-none
        transition-opacity duration-300
      "
      aria-hidden="true"
    ></div>

    <!-- CART DRAWER: slides from right -->
    <aside
      id="cart-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
      class="
        fixed top-0 right-0 h-full w-full max-w-[417px] z-50
        bg-white shadow-2xl
        translate-x-full transition-transform duration-300 ease-in-out
        flex flex-col
      "
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-8 py-7 border-b border-gray-100">
        <h2 class="text-2xl font-bold text-[#3A3A3A]">Shopping Cart</h2>
        <button
          id="cart-close-btn"
          class="p-2 text-gray-400 hover:text-[#B88E2F] transition-colors"
          aria-label="Close cart"
        >
          <i class="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>

      <!-- Cart Items (scrollable) -->
      <div id="cart-items-list" class="flex-1 overflow-y-auto px-8 py-6 space-y-6">
        <!-- Populated by renderCartItems() -->
      </div>

      <!-- Footer: Subtotal + Checkout -->
      <div id="cart-footer" class="px-8 py-6 border-t border-gray-100">
        <!-- Populated by renderCartItems() -->
      </div>
    </aside>
  `;

  document.body.insertAdjacentHTML("beforeend", drawerHTML);

  // Bind close button and overlay click
  document.getElementById("cart-close-btn")?.addEventListener("click", closeDrawer);
  document.getElementById("cart-overlay")?.addEventListener("click", closeDrawer);
}

// ── OPEN / CLOSE ──────────────────────────────────────────────

function openDrawer() {
  drawerOpen = true;
  renderCartItems(); // Always re-render on open to show latest state
  document.getElementById("cart-drawer")?.classList.remove("translate-x-full");
  document.getElementById("cart-overlay")?.classList.remove("opacity-0", "pointer-events-none");
  document.getElementById("cart-overlay")?.classList.add("opacity-100");
  document.body.classList.add("overflow-hidden");
}

function closeDrawer() {
  drawerOpen = false;
  document.getElementById("cart-drawer")?.classList.add("translate-x-full");
  document.getElementById("cart-overlay")?.classList.add("opacity-0", "pointer-events-none");
  document.getElementById("cart-overlay")?.classList.remove("opacity-100");
  document.body.classList.remove("overflow-hidden");
}

// ── RENDER CART ITEMS ─────────────────────────────────────────

function renderCartItems() {
  const items = getCart();
  const listEl = document.getElementById("cart-items-list");
  const footerEl = document.getElementById("cart-footer");
  if (!listEl || !footerEl) return;

  if (items.length === 0) {
    listEl.innerHTML = `
      <div class="flex flex-col items-center justify-center h-full text-center py-12">
        <i class="fa-solid fa-cart-shopping text-5xl text-gray-200 mb-4"></i>
        <p class="text-gray-400 font-medium">Your cart is empty</p>
        <p class="text-gray-300 text-sm mt-1">Add some furniture to get started</p>
      </div>
    `;
    footerEl.innerHTML = "";
    return;
  }

  // Render each cart item
  listEl.innerHTML = items
    .map(
      (item) => `
      <div class="flex gap-4 items-start cart-item" data-cart-item-id="${item.id}">
        <img
          src="${item.image}"
          alt="${item.name}"
          class="w-24 h-24 object-cover rounded bg-[#F4F5F7] shrink-0"
          onerror="this.src='https://placehold.co/96x96/F4F5F7/898989?text=${encodeURIComponent(item.name)}'"
        />
        <div class="flex-1 min-w-0">
          <h4 class="text-[#3A3A3A] font-medium text-sm leading-tight truncate">${item.name}</h4>
          <p class="text-[#898989] text-xs mt-1">${item.subtitle}</p>
          <div class="flex items-center gap-2 mt-2">
            <span class="text-xs text-[#898989]">${item.quantity} ×</span>
            <span class="text-[#B88E2F] font-semibold text-sm">${formatPrice(item.price)}</span>
          </div>
        </div>
        <button
          class="remove-cart-item shrink-0 text-gray-300 hover:text-red-400 transition-colors p-1"
          data-id="${item.id}"
          aria-label="Remove ${item.name} from cart"
        >
          <i class="fa-solid fa-circle-xmark"></i>
        </button>
      </div>
    `
    )
    .join('<hr class="border-gray-100" />');

  // Subtotal
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  footerEl.innerHTML = `
    <div class="flex justify-between items-center mb-6">
      <span class="text-[#3A3A3A] font-medium">Subtotal</span>
      <span class="text-[#B88E2F] font-bold text-lg">${formatPrice(subtotal)}</span>
    </div>
    <div class="flex gap-3">
      <button class="flex-1 py-3 border border-[#3A3A3A] rounded-full text-sm font-medium text-[#3A3A3A] hover:bg-[#3A3A3A] hover:text-white transition-colors">
        Cart
      </button>
      <button class="flex-1 py-3 border border-[#3A3A3A] rounded-full text-sm font-medium text-[#3A3A3A] hover:bg-[#3A3A3A] hover:text-white transition-colors">
        Checkout
      </button>
    </div>
  `;

  // Bind remove buttons (event delegation on list)
  listEl.querySelectorAll(".remove-cart-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeFromCart(Number(btn.dataset.id));
      renderCartItems(); // Re-render just the drawer
    });
  });
}

// ── CART BADGE ─────────────────────────────────────────────────

function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  const count = getCartCount();
  if (!badge) return;

  badge.textContent = count;
  badge.classList.toggle("hidden", count === 0); // Hide badge when cart is empty
}

// ── EVENT BINDINGS ─────────────────────────────────────────────

function bindCartIcon() {
  const cartIcon = document.getElementById("cart-icon-btn");
  cartIcon?.addEventListener("click", () => {
    drawerOpen ? closeDrawer() : openDrawer();
  });
}

function bindCartUpdatedEvent() {
  // Listens for the custom event fired by cart.js saveCart()
  document.addEventListener("cartUpdated", () => {
    updateCartBadge();
    if (drawerOpen) renderCartItems(); // Update drawer in real-time if open
  });
}