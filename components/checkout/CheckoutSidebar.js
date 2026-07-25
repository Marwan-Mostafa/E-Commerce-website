import { OrderSummary } from "./OrderSummary.js";
import { PaymentSection } from "./PaymentSection.js";

const WRAPPER_CLASS = `
flex
flex-col
gap-12
sticky
top-28
`;

const TITLE_ID = "checkout-sidebar-title";

function trimClassList(classList) {
    return classList
        .split(/\s+/)
        .filter(Boolean)
        .join(" ");
}

export function CheckoutSidebar({
    items = [],
    subtotal = "",
    total = "",
    checkoutDisabled = false,
} = {}) {

    const orderSummary = OrderSummary({
        items,
        subtotal,
        total,
    });

    const paymentSection = PaymentSection({
        checkoutDisabled,
    });

    return `
        <aside
            class="${trimClassList(WRAPPER_CLASS)}"
            aria-labelledby="${TITLE_ID}">

            <h2
                id="${TITLE_ID}"
                class="sr-only">

                Checkout Summary

            </h2>

            ${orderSummary}

            ${paymentSection}

        </aside>
    `;
}