const WRAPPER_CLASS = `
bg-[#F9F1E7]
rounded-sm
p-8
h-fit
`

const ROW_CLASS = `
flex
items-center
justify-between
`

const CHECKOUT_BUTTON_CLASS = `
block
w-full
mt-8
border
border-black
rounded-[15px]
py-4
text-center
text-black
font-medium
transition-all
duration-300
hover:bg-[#B88E2F]
hover:border-[#B88E2F]
hover:text-white
`

export function CartSummary({
    subtotal = "",
    total = "",
    checkoutDisabled = false,
} = {}) {

    return `
        <aside
            class="${WRAPPER_CLASS}"
            role="complementary"
            aria-labelledby="cart-summary-title">

            <h2 id="cart-summary-title" class="text-[32px] font-semibold text-center mb-10">
                Cart Totals
            </h2>

            <div class="${ROW_CLASS} mb-6">

                <span class="font-medium text-[#3A3A3A]">
                    Subtotal
                </span>

                <span id="summary-subtotal"
                    class="text-[#9F9F9F]">

                    ${subtotal}

                </span>

            </div>

            <div class="${ROW_CLASS}">

                <span class="font-medium text-[#3A3A3A]">
                    Total
                </span>

                <span
                    id="summary-total"
                    class="text-[#B88E2F] text-xl font-semibold">

                    ${total}

                </span>

            </div>

            <a
                href="${checkoutDisabled ? "#" : "/pages/checkout/checkout.html"}"
                class="${CHECKOUT_BUTTON_CLASS}
                ${checkoutDisabled ? "pointer-events-none opacity-50" : ""}"
                aria-label="Proceed to checkout"
                aria-disabled="${checkoutDisabled}">

                Check Out

            </a>

        </aside>
    `;
}