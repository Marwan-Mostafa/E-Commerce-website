import { OrderSummary } from "./OrderSummary.js";
import { PaymentSection } from "./PaymentSection.js";

const WRAPPER_CLASS = `
flex
flex-col
gap-12
sticky
top-28
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
            aria-labelledby="checkout-sidebar-title">

            <h2
                id="checkout-sidebar-title"
                class="sr-only">

                Checkout Summary

            </h2>

            ${OrderSummary({

        items,

        subtotal,

        total,

    })}
            ${PaymentSection({ checkoutDisabled })}
        </aside>

    `

}