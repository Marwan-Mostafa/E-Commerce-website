import { renderNavbar } from "../../components/Navbar.js";
import { renderFooter } from "../../components/Footer.js";
import { renderFeaturesSection } from "../../components/FeaturesSection.js";

import { CartRows } from "../../components/cart/CartRows.js";
import { CartSummary } from "../../components/cart/CartSummary.js";
import { EmptyCart } from "../../components/cart/EmptyCart.js";

import {
    getCart,
    getSubtotal,
    getTotal,
    updateQuantity,
    removeFromCart,
    formatCurrency,
} from "../../state/cartState.js";

const navbarRoot = document.getElementById("navbar-root");
const footerRoot = document.getElementById("footer-root");
const featuresRoot = document.getElementById("featuresSection");
const cartContentRoot = document.getElementById("cart-content");
const emptyStateRoot = document.getElementById("cart-empty-state");
const cartRowsRoot = document.getElementById("cart-rows");
const summaryRoot = document.getElementById("cart-summary-root");



function renderLayout() {
    navbarRoot.innerHTML = renderNavbar("cart");
    footerRoot.innerHTML = renderFooter();
    featuresRoot.innerHTML = renderFeaturesSection();
}


function renderRows(items) {

    if (!cartRowsRoot) return;

    cartRowsRoot.innerHTML = CartRows(items);

}


function renderSummary(items) {

    if (!summaryRoot) return;

    summaryRoot.innerHTML = CartSummary({

        subtotal: formatCurrency(getSubtotal()),

        total: formatCurrency(getTotal()),

        checkoutDisabled: items.length === 0,

    })

}

function renderEmptyState(items) {

    if (!cartContentRoot || !emptyStateRoot) return;

    if (items.length === 0) {

        cartContentRoot.classList.add("hidden");

        emptyStateRoot.classList.remove("hidden");

        emptyStateRoot.innerHTML = EmptyCart();

        return;

    }

    cartContentRoot.classList.remove("hidden");

    emptyStateRoot.classList.add("hidden");

}

function renderPage() {

    const items = getCart();

    renderEmptyState(items);

    if (items.length === 0) return;

    renderRows(items);

    renderSummary(items);

}


function handleQuantityChange(event) {

    const input = event.target.closest(".cart-quantity");

    if (!input) return;

    const row = input.closest("[data-product-id]");

    if (!row) return;

    const item = getCart().find(item => item.id === Number(row.dataset.productId));
    if (!item) return

    const quantity = Math.max(1, Number(input.value) || 1)

    updateQuantity(item, quantity);

}


function handleRemove(event) {

    const button = event.target.closest(".remove-cart-item");

    if (!button) return;

    const productId = Number(button.dataset.productId);

    removeFromCart(productId);

}

function bindEvents() {

    if (!cartRowsRoot) return;

    cartRowsRoot.addEventListener(

        "change",

        handleQuantityChange

    );

    cartRowsRoot.addEventListener(

        "click",

        handleRemove

    );

}

function subscribeToCartUpdates() {

    window.addEventListener(

        "cart:updated",

        renderPage

    );

}

function bootstrap() {

    renderLayout()
    renderPage()
    bindEvents()
    subscribeToCartUpdates()
}

bootstrap()