import { OrderSummary } from "./OrderSummary.js";
import { PaymentSection } from "./PaymentSection.js";

const SIDEBAR_CLASS = `
flex
flex-col
gap-10
`

export function CheckoutSidebar({
    items = [],
    subtotal = "",
    total = "",
    checkoutDisabled = false,
} = {}) {

    return `

        <aside
            class="${SIDEBAR_CLASS}"
            aria-label="Checkout Summary">

            ${OrderSummary({
        items,
        subtotal,
        total,
    })}

            ${PaymentSection({
        checkoutDisabled,
    })}

        </aside>

    `;

}