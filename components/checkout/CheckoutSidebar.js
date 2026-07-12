import { OrderSummary } from "./OrderSummary.js";
import { PaymentSection } from "./PaymentSection.js";

const WRAPPER_CLASS = `
flex
flex-col
gap-12
`

export function CheckoutSidebar({
    items = [],
    subtotal = "",
    total = "",
    checkoutDisabled = false,
} = {}) {

    return `

        <div
            class="${WRAPPER_CLASS}"
            aria-label="Checkout Summary">

            ${OrderSummary({
        items,
        subtotal,
        total,
    })}

            ${PaymentSection({
        checkoutDisabled,
    })}

        </div>

    `;

}