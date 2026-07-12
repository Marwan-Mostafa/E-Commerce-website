import { renderNavbar } from "../../components/Navbar.js";
import { renderFooter } from "../../components/Footer.js";
import { renderFeaturesSection } from "../../components/FeaturesSection.js";

import { BillingForm } from "../../components/checkout/BillingForm.js";
import { CheckoutSidebar } from "../../components/checkout/CheckoutSidebar.js";
import { EmptyCart } from "../../components/cart/EmptyCart.js";

import {
    getCart,
    getSubtotal,
    getTotal,
    formatCurrency,
    clearCart,
} from "../../state/cartState.js";


const navbarRoot = document.getElementById("navbar-root");
const footerRoot = document.getElementById("footer-root");
const featuresRoot = document.getElementById("featuresSection");

const billingRoot = document.getElementById("billing-form-root");

const sidebarRoot = document.getElementById("checkout-sidebar-root");

const checkoutContentRoot = document.getElementById("checkout-content");
const emptyStateRoot = document.getElementById("checkout-empty-state");



const PAYMENT_DESCRIPTIONS = {

    bank:
        "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.",

    cod:
        "Pay with cash when your order is delivered to your address.",

};



function renderLayout() {

    navbarRoot.innerHTML = renderNavbar("checkout");

    footerRoot.innerHTML = renderFooter();

    featuresRoot.innerHTML = renderFeaturesSection();

}


function renderBillingForm() {

    if (!billingRoot) return;

    billingRoot.innerHTML = BillingForm();

}


function renderSidebar(items) {

    if (!sidebarRoot) return;

    sidebarRoot.innerHTML = CheckoutSidebar({

        items,

        subtotal: formatCurrency(getSubtotal()),

        total: formatCurrency(getTotal()),

        checkoutDisabled: items.length === 0,

    });

}


function renderEmptyState(items) {

    if (!checkoutContentRoot || !emptyStateRoot) return;

    if (items.length === 0) {

        checkoutContentRoot.classList.add("hidden");

        emptyStateRoot.classList.remove("hidden");

        emptyStateRoot.innerHTML = EmptyCart();

        return;

    }

    checkoutContentRoot.classList.remove("hidden");

    emptyStateRoot.classList.add("hidden");

}



function renderPage() {

    const items = getCart();

    renderEmptyState(items);

    if (items.length === 0) return;

    renderBillingForm();

    renderSidebar(items);

}


function handlePaymentChange(event) {

    const radio = event.target.closest("[name='paymentMethod']");

    if (!radio) return;

    const description = document.getElementById("payment-description");

    if (!description) return;

    description.textContent =

        PAYMENT_DESCRIPTIONS[radio.value];

}


function validateForm(form) {

    return form.reportValidity();

}



function handleSubmit(event) {

    event.preventDefault();

    const form = event.currentTarget;

    if (!validateForm(form)) return;

    if (getCart().length === 0) return;

    clearCart();

    alert("Order placed successfully.");

}

function bindEvents() {

    document.addEventListener(

        "change",

        handlePaymentChange

    );



    document.addEventListener(

        "submit",

        (event) => {

            if (

                event.target.id !==

                "checkout-form"

            )

                return;

            handleSubmit(event);

        }

    );

}


function subscribeToCartUpdates() {

    window.addEventListener(

        "cart:updated",

        renderPage

    );

}

function bootstrap() {

    renderLayout();

    renderPage();

    bindEvents();

    subscribeToCartUpdates();

}

bootstrap();