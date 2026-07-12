const WRAPPER_CLASS = `
mt-10
border-t
border-[#D9D9D9]
pt-8
`

const PAYMENT_ROW_CLASS = `
flex
items-start
gap-4
`

const RADIO_CLASS = `
mt-[6px]
accent-black
cursor-pointer
`

const LABEL_CLASS = `
font-medium
text-[#3A3A3A]
cursor-pointer
select-none
`

const DESCRIPTION_CLASS = `
mt-4
text-[#9F9F9F]
leading-7
`

const PRIVACY_CLASS = `
mt-8
text-[#9F9F9F]
leading-7
`

const BUTTON_CLASS = `
block
w-full
max-w-[318px]
mx-auto
mt-10
h-16
rounded-[15px]
border
border-black
text-xl
font-normal
transition-all
duration-300
hover:bg-[#B88E2F]
hover:border-[#B88E2F]
hover:text-white
disabled:pointer-events-none
disabled:opacity-50
cursor-pointer
`

const DEFAULT_DESCRIPTION = `
Make your payment directly into our bank account.
Please use your Order ID as the payment reference.
Your order will not be shipped until the funds have
cleared in our account.
`

const PRIVACY_TEXT = `
Your personal data will be used to support your experience
throughout this website, to manage access to your account,
and for other purposes described in our privacy policy.
`

function PaymentOption({
    id,
    value,
    label,
    checked = false,
}) {

    return `
        <div class="${PAYMENT_ROW_CLASS}">

            <input
                id="${id}"
                type="radio"
                name="paymentMethod"
                value="${value}"
                ${checked ? "checked" : ""}
                autocomplete="off"
                class="${RADIO_CLASS}">

            <label
                for="${id}"
                class="${LABEL_CLASS}">

                ${label}

            </label>

        </div>
    `;

}

export function PaymentSection({
    checkoutDisabled = false,
} = {}) {

    return `

        <section
            class="${WRAPPER_CLASS}"
            aria-labelledby="payment-title">

            <h2
                id="payment-title"
                class="sr-only">

                Payment Method

            </h2>

            ${PaymentOption({
        id: "bank",
        value: "bank",
        label: "Direct Bank Transfer",
        checked: true,
    })}

            <p
                id="payment-description"
                aria-live="polite"
                class="${DESCRIPTION_CLASS}">

                ${DEFAULT_DESCRIPTION}

            </p>

            <div class="mt-6">

                ${PaymentOption({
        id: "cod",
        value: "cod",
        label: "Cash On Delivery",
    })}

            </div>

            <p class="${PRIVACY_CLASS}">

                ${PRIVACY_TEXT}

            </p>

            <button
                id="place-order-btn"
                type="submit"
                aria-label="Place Order"
                ${checkoutDisabled ? "disabled" : ""}
                class="${BUTTON_CLASS}">

                Place Order

            </button>

        </section>

    `

}