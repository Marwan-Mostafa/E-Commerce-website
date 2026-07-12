const WRAPPER_CLASS = `
mt-10
border-t
border-[#D9D9D9]
pt-8
`

const FIELDSET_CLASS = `
flex
flex-col
gap-6
`;

const PAYMENT_ROW_CLASS = `
flex
items-start
gap-4
cursor-pointer
`

const RADIO_CLASS = `
mt-[5px]
w-[18px]
h-[18px]
accent-[#000]
cursor-pointer
shrink-0
`

const LABEL_CLASS = `
font-medium
text-[16px]
text-[#3A3A3A]
cursor-pointer
select-none
leading-6
`

const DESCRIPTION_CLASS = `
ml-[34px]
text-[15px]
text-[#9F9F9F]
leading-7
transition-all
duration-300
`

const PRIVACY_CLASS = `
mt-8
text-[15px]
text-[#9F9F9F]
leading-7
`

const BUTTON_CLASS = `
block
w-full
max-w-[320px]
mx-auto
mt-10
h-[64px]
rounded-2xl
border
border-black
bg-white
text-[20px]
font-medium
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
        <label for="${id}" class="${PAYMENT_ROW_CLASS}">

            <input
                id="${id}"
                type="radio"
                name="paymentMethod"
                value="${value}"
                ${checked ? "checked" : ""}
                class="${RADIO_CLASS}"
                autocomplete="off">

            <span class="${LABEL_CLASS}">
                ${label}
            </span>

        </label>
    `;

}

export function PaymentSection({
    checkoutDisabled = false,
} = {}) {

    return `

        <section
            class="${WRAPPER_CLASS}"
            aria-labelledby="payment-title">

            <fieldset
                class="${FIELDSET_CLASS}">

        <legend
            id="payment-title"
            class="sr-only">

            Payment Method

        </legend>

        ${PaymentOption({

        id: "bank",

        value: "bank",

        label: "Direct Bank Transfer",

        checked: true,

    })}

        ${PaymentOption({

        id: "cod",

        value: "cod",

        label: "Cash On Delivery",

    })}

    </fieldset>

            <p
                id="payment-description"
                aria-live="polite"
                class="${DESCRIPTION_CLASS}">

                ${DEFAULT_DESCRIPTION}

            </p>

            <p class="${PRIVACY_CLASS}">

                ${PRIVACY_TEXT}

            </p>

            <button
                id="place-order-btn"
                form="checkout-form"
                type="submit"
                aria-label="Place Order"
                ${checkoutDisabled ? "disabled" : ""}
                class="${BUTTON_CLASS}">

                Place Order

            </button>

        </section>

    `

}