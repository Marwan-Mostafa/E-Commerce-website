import { renderNavbar } from "../../components/Navbar.js";
import { renderFooter } from "../../components/Footer.js";
import { renderFeaturesSection } from "../../components/FeaturesSection.js";
import { setupWishlistBadge } from "../../modules/navbar/wishlistBadge.js";
import { BillingForm } from "../../components/checkout/BillingForm.js";
import { CheckoutSidebar } from "../../components/checkout/CheckoutSidebar.js";
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

    if (!billingRoot) return;
    billingRoot.innerHTML = BillingForm();

}


function renderSidebar(items) {

    if (!sidebarRoot) return;

    const summaryItems = items.map(item => ({
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
            "[checkout] Missing #checkout-content or #checkout-empty-state root(s)."
        );
        return;
    }

    const isEmpty = items.length === 0
    checkoutContentRoot.classList.toggle("hidden", isEmpty);
    emptyStateRoot.classList.toggle("hidden", !isEmpty);
    emptyStateRoot.innerHTML = isEmpty
        ? EmptyCart()
        : "";

}


function renderPage() {

    const items = getCart();
    renderEmptyState(items);
    if (!items.length) return;
    renderBillingForm();
    renderSidebar(items);

}


function handlePaymentChange(event) {

    const radio = event.target.closest("input[name='paymentMethod']");

    if (!radio) return;

    const description = document.getElementById("payment-description");

    if (!description) return;
    description.textContent = radio.dataset.description ?? "";

}


function validateForm(form) {

    const fields = form.querySelectorAll(
        "input:not([type='radio']), select, textarea"
    );

    let isValid = true;

    fields.forEach(field => {

        const error = field
            .closest("div")
            ?.querySelector(".field-error");

        field.classList.remove(
            "border-red-500",
            "focus:border-red-500"
        );

        if (error) {

            error.classList.add("hidden");

            error.textContent = "";

        }

        if (!field.checkValidity()) {

            isValid = false;

            field.classList.add(
                "border-red-500",
                "focus:border-red-500"
            );

            if (error) {

                error.textContent =
                    field.validationMessage;

                error.classList.remove("hidden");

            }

        }

    });

    return isValid;

}



function handleSubmit(event) {

    event.preventDefault();

    const form = event.currentTarget;

    if (!validateForm(form)) return;

    const currentItems = getCart();

    if (!currentItems.length) return;

    console.log("Order Created");
    currentItems.forEach(item => removeFromCart(item.id));

    form.reset();
    window.scrollTo({ top: 0, behavior: "smooth" });

    alert("Order placed successfully.");
    renderPage();

}

function bindEvents() {

    document.addEventListener(

        "change",

        handlePaymentChange

    );



    document.addEventListener(

        "submit",

        (event) => {
            if (event.target.id !== "checkout-form")
                return;
            handleSubmit(event);
        }
    );
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