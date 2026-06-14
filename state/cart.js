/**
 * ============================================================
 *  state/cart.js
 *  PURPOSE: Manages all cart state + localStorage persistence.
 *
 *  WHY A SEPARATE STATE FILE?
 *  If cart logic lived inside ProductCard.js, it would be
 *  duplicated every time a card is rendered. By isolating it
 *  here, any component — Navbar, ProductCard, CartDrawer —
 *  can import these functions and share the SAME state.
 *
 *  PATTERN: Module Pattern (no class needed for simple state).
 *  All functions are pure or effect-based. No framework needed.
 * ============================================================
 */

const CART_KEY = "furniro_cart"; // localStorage key — consistent across all files

/**
 * getCart()
 * Reads cart from localStorage and parses JSON.
 * Returns an empty array if nothing is stored yet.
 *
 * WHY: localStorage only stores strings. JSON.parse converts
 * the stored string back into a real JavaScript array.
 */
export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return []; // Handles corrupted localStorage data gracefully
  }
}

/**
 * saveCart(items)
 * Serializes the cart array to JSON and saves to localStorage.
 * Also triggers a custom DOM event so Navbar can update badge count.
 *
 * WHY CUSTOM EVENT: Components don't import each other.
 * Instead, cart changes fire "cartUpdated" on document,
 * and any listener (Navbar icon badge) responds automatically.
 * This is the Publish/Subscribe (PubSub) pattern — decoupled.
 */
function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  // Dispatch a custom event so Navbar badge can update
  document.dispatchEvent(new CustomEvent("cartUpdated", { detail: { cart: items } }));
}

/**
 * addToCart(product)
 * Adds a product to cart. If it already exists, increments quantity.
 *
 * WHY findIndex: We need the index to mutate the existing item.
 * If we used find(), we'd get the object but couldn't easily update
 * the array in place.
 */
export function addToCart(product) {
  const cart = getCart();
  const existingIndex = cart.findIndex((item) => item.id === product.id);

  if (existingIndex >= 0) {
    // Product already in cart — increment quantity
    cart[existingIndex].quantity += 1;
  } else {
    // New product — add with quantity 1
    cart.push({ ...product, quantity: 1 });
    // Spread operator (...) clones product so we don't mutate the original data
  }

  saveCart(cart);
  return cart;
}

/**
 * removeFromCart(productId)
 * Removes a product completely from cart by filtering it out.
 */
export function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
  return cart;
}

/**
 * getCartCount()
 * Returns total number of ITEMS (sum of quantities), not unique products.
 * Used by the Navbar badge: "3 items" not "3 products".
 */
export function getCartCount() {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}