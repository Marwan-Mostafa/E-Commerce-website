import { renderNavbar } from "../../components/Navbar.js";
import { renderFooter } from "../../components/Footer.js";
import { renderFeaturesSection } from "../../components/FeaturesSection.js";

import { setupWishlistBadge } from "../../modules/navbar/wishlistBadge.js";

import { BillingForm } from "../../components/checkout/BillingForm.js";
import { CheckoutSidebar } from "../../components/checkout/CheckoutSidebar.js";
import { initCheckout } from "../../components/checkout/Checkoutcontroller.js";

import { EmptyCart } from "../../components/cart/EmptyCart.js";

import {
    getCart,
    getSubtotal,
    getTotal,
    formatCurrency,
    removeFromCart,
    subscribe,
} from "../../state/cartState.js";

const navbarRoot = document.getElementById("navbar-root");
const footerRoot = document.getElementById("footer-root");
const featuresRoot = document.getElementById("featuresSection");

const billingRoot = document.getElementById("billing-form-root");
const sidebarRoot = document.getElementById("checkout-sidebar-root");

const checkoutContentRoot = document.getElementById("checkout-content");
const emptyStateRoot = document.getElementById("checkout-empty-state");

function renderLayout() {
    navbarRoot.innerHTML = renderNavbar("checkout");

    footerRoot.innerHTML = renderFooter();

    featuresRoot.innerHTML = renderFeaturesSection();

    setupWishlistBadge();
}

function renderBillingForm() {
    if (!billingRoot) {
        return;
    }

    billingRoot.innerHTML = BillingForm();
}

function renderSidebar(items) {
    if (!sidebarRoot) {
        return;
    }

    const summaryItems = items.map((item) => ({
        ...item,
        formattedSubtotal: formatCurrency(
            item.price * item.quantity
        ),
    }));

    sidebarRoot.innerHTML = CheckoutSidebar({
        items: summaryItems,
        subtotal: formatCurrency(getSubtotal()),
        total: formatCurrency(getTotal()),
        checkoutDisabled: !items.length,
    });
}

function renderEmptyState(items) {
    if (!checkoutContentRoot || !emptyStateRoot) {
        console.warn(
            "[checkout] Missing checkout container elements."
        );
        return;
    }

    const isEmpty = items.length === 0;

    checkoutContentRoot.classList.toggle("hidden", isEmpty);

    emptyStateRoot.classList.toggle("hidden", !isEmpty);

    emptyStateRoot.innerHTML = isEmpty
        ? EmptyCart()
        : "";
}

function renderPage() {
    const items = getCart();

    renderEmptyState(items);

    if (!items.length) {
        return;
    }

    renderBillingForm();

    renderSidebar(items);

    initCheckout({
        formContainer: billingRoot,
        sidebarRoot,
        onPlaceOrder: placeOrder,
    });
}

async function placeOrder({
    billing,
    paymentMethod,
    formElement,
}) {
    const currentItems = getCart();

    if (!currentItems.length) {
        return;
    }

    const order = {
        billing,
        paymentMethod,
        items: currentItems,
        subtotal: getSubtotal(),
        total: getTotal(),
        createdAt: new Date().toISOString(),
    };

    console.log("Order Created:", order);

    formElement.reset();

    currentItems.forEach((item) => {
        removeFromCart(item.id);
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

    alert("Order placed successfully.");
}

function bindEvents() {
}

function subscribeToCartUpdates() {
    subscribe(renderPage);
}

function bootstrap() {
    renderLayout();

    renderPage();

    bindEvents();

    subscribeToCartUpdates();
}

bootstrap();