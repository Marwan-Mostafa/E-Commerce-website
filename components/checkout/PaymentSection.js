const WRAPPER_CLASS = `
mt-10
border-t
border-[#D9D9D9]
pt-8
`;

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
`;

const RADIO_CLASS = `
mt-[5px]
w-[18px]
h-[18px]
accent-[#000]
cursor-pointer
shrink-0
`;

const LABEL_CLASS = `
font-medium
text-[16px]
text-[#3A3A3A]
cursor-pointer
select-none
leading-6
`;

const DESCRIPTION_CLASS = `
ml-[34px]
text-[15px]
text-[#9F9F9F]
leading-7
transition-all
duration-300
`;

const PRIVACY_CLASS = `
mt-8
text-[15px]
text-[#9F9F9F]
leading-7
`;

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
`;

const BANK_DESCRIPTION = `
Make your payment directly into our bank account.
Please use your Order ID as the payment reference.
Your order will not be shipped until the funds have
cleared in our account.
`;

const COD_DESCRIPTION = `
Pay in cash to our courier when your order is delivered
to your doorstep. Please have the exact amount ready, as
our couriers may not carry change.
`;

const PRIVACY_TEXT = `
Your personal data will be used to support your experience
throughout this website, to manage access to your account,
and for other purposes described in our privacy policy.
`;


const PAYMENT_OPTIONS = [
    {
        id: "bank",
        value: "bank",
        label: "Direct Bank Transfer",
        checked: true,
        description: BANK_DESCRIPTION,
    },
    {
        id: "cod",
        value: "cod",
        label: "Cash On Delivery",
        description: COD_DESCRIPTION,
    },
];


function getDefaultOption(options) {
    const checkedOptions = options.filter((option) => option.checked);

    if (checkedOptions.length !== 1) {
        console.warn(
            `[PaymentSection] Expected exactly one default (checked) payment option, found ${checkedOptions.length}.`,
            options
        );
    }

    return checkedOptions[0] ?? options[0];
}

const DEFAULT_PAYMENT_OPTION = getDefaultOption(PAYMENT_OPTIONS);


const DEFAULT_DESCRIPTION = DEFAULT_PAYMENT_OPTION?.description ?? "";


function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}


function trimClassList(classList) {
    return classList
        .split(/\s+/)
        .filter(Boolean)
        .join(" ");
}


function normalizeWhitespace(text) {
    return String(text ?? "").replace(/\s+/g, " ").trim();
}


function PaymentOption({
    id,
    value,
    label,
    checked = false,
    description = "",
}) {

    return `
        <label for="${escapeHtml(id)}" class="${trimClassList(PAYMENT_ROW_CLASS)}">

            <input
                id="${escapeHtml(id)}"
                type="radio"
                name="paymentMethod"
                value="${escapeHtml(value)}"
                ${checked ? "checked" : ""}
                data-description="${escapeHtml(normalizeWhitespace(description))}"
                aria-describedby="payment-description"
                class="${trimClassList(RADIO_CLASS)}"
                autocomplete="off">

            <span class="${trimClassList(LABEL_CLASS)}">
                ${escapeHtml(label)}
            </span>

        </label>
    `;

}


export function PaymentSection({
    checkoutDisabled = false,
} = {}) {

    return `

        <section
            class="${trimClassList(WRAPPER_CLASS)}"
            aria-labelledby="payment-title">

            <fieldset
                class="${trimClassList(FIELDSET_CLASS)}">

        <legend
            id="payment-title"
            class="sr-only">

            Payment Method

        </legend>

        ${PAYMENT_OPTIONS.map(PaymentOption).join("")}

    </fieldset>

            <p
                id="payment-description"
                aria-live="polite"
                class="${trimClassList(DESCRIPTION_CLASS)}">

                ${escapeHtml(DEFAULT_DESCRIPTION)}

            </p>

            <p class="${trimClassList(PRIVACY_CLASS)}">

                ${escapeHtml(PRIVACY_TEXT)}

            </p>

            <button
                id="place-order-btn"
                form="checkout-form"
                type="submit"
                aria-label="Place Order"
                ${checkoutDisabled ? "disabled" : ""}
                class="${trimClassList(BUTTON_CLASS)}">

                Place Order

            </button>

        </section>

    `

}