import { getFormId } from "./BillingForm.js";
import {
    renderRadioGroupError,
    getDefaultChecked,
    getGroupValue,
    setGroupError,
    clearGroupError,
} from "./BillingField.js";

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

const ERROR_CLASS = `
hidden
ml-[34px]
text-[13px]
font-medium
text-red-500
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

const GROUP_NAME = "paymentMethod";

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

const DEFAULT_PAYMENT_OPTION = getDefaultChecked(PAYMENT_OPTIONS, {
    groupLabel: GROUP_NAME,
});

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


function withPrefix(option, prefix) {
    if (!prefix) {
        return option;
    }

    return { ...option, id: `${prefix}${option.id}` };
}


function PaymentOption({
    id,
    value,
    label,
    checked = false,
    description = "",
    groupName,
    formId,
    descriptionId,
    errorId,
}) {

    return `
        <label for="${escapeHtml(id)}" class="${trimClassList(PAYMENT_ROW_CLASS)}">

            <input
                id="${escapeHtml(id)}"
                type="radio"
                name="${escapeHtml(groupName)}"
                value="${escapeHtml(value)}"
                form="${escapeHtml(formId)}"
                required
                ${checked ? "checked" : ""}
                data-description="${escapeHtml(normalizeWhitespace(description))}"
                aria-describedby="${escapeHtml(descriptionId)} ${escapeHtml(errorId)}"
                aria-required="true"
                aria-invalid="false"
                class="${trimClassList(RADIO_CLASS)}"
                autocomplete="off">

            <span class="${trimClassList(LABEL_CLASS)}">
                ${escapeHtml(label)}
            </span>

        </label>
    `;

}


export function PaymentSection({
    instanceId,
    checkoutDisabled = false,
} = {}) {

    const prefix = instanceId ? `${instanceId}-` : "";
    const formId = getFormId(instanceId);
    const groupName = `${prefix}${GROUP_NAME}`;
    const descriptionId = `${prefix}payment-description`;
    const buttonId = `${prefix}place-order-btn`;

    const options = PAYMENT_OPTIONS.map((option) => withPrefix(option, prefix));

    return `

        <section
            class="${trimClassList(WRAPPER_CLASS)}"
            aria-labelledby="payment-title"
            data-payment-section>

            <fieldset
                class="${trimClassList(FIELDSET_CLASS)}"
                data-group-name="${escapeHtml(groupName)}">

        <legend
            id="payment-title"
            class="sr-only">

            Payment Method

        </legend>

        ${options.map((option) => PaymentOption({
        ...option,
        groupName,
        formId,
        descriptionId,
        errorId: `${groupName}-error`,
    })).join("")}

    </fieldset>

            <p
                id="${escapeHtml(descriptionId)}"
                aria-live="polite"
                data-payment-description
                class="${trimClassList(DESCRIPTION_CLASS)}">

                ${escapeHtml(DEFAULT_DESCRIPTION)}

            </p>

            ${renderRadioGroupError({ name: groupName, className: ERROR_CLASS })}

            <p class="${trimClassList(PRIVACY_CLASS)}">

                ${escapeHtml(PRIVACY_TEXT)}

            </p>

            <button
                id="${escapeHtml(buttonId)}"
                form="${escapeHtml(formId)}"
                type="submit"
                aria-label="Place Order"
                data-place-order-btn
                ${checkoutDisabled ? "disabled" : ""}
                class="${trimClassList(BUTTON_CLASS)}">

                Place Order

            </button>

        </section>

    `

}

function getRenderedGroupName(root) {
    const fieldset = root.querySelector("fieldset[data-group-name]");
    return fieldset?.dataset.groupName ?? null;
}


export function initPaymentSection(root) {
    if (!root) {
        return;
    }

    const section = root.querySelector("[data-payment-section]");
    if (!section || section.dataset.paymentSectionInit) {
        return;
    }
    section.dataset.paymentSectionInit = "true";

    const groupName = getRenderedGroupName(section);
    if (!groupName) {
        return;
    }

    const descriptionEl = section.querySelector("[data-payment-description]");
    const radios = section.querySelectorAll(`input[name="${CSS.escape(groupName)}"]`);

    radios.forEach((radio) => {
        radio.addEventListener("change", () => {
            if (descriptionEl) {
                descriptionEl.textContent = radio.dataset.description ?? "";
            }
            clearGroupError(root, groupName);
        });
    });
}

export function validatePaymentMethod(root) {
    const groupName = getRenderedGroupName(root);
    if (!groupName) {
        return null;
    }

    const value = getGroupValue(root, groupName);

    if (!value) {
        setGroupError(root, groupName, "Please select a payment method.");
        return null;
    }

    clearGroupError(root, groupName);
    return value;
}

export function setPlaceOrderState(root, state) {
    const button = root.querySelector("[data-place-order-btn]");
    if (!button) {
        return;
    }

    if (!button.dataset.defaultLabel) {
        button.dataset.defaultLabel = button.textContent.trim();
    }

    if (state === "processing") {
        button.disabled = true;
        button.textContent = "Placing Order…";
    } else if (state === "success") {
        button.disabled = true;
        button.textContent = "Order Placed";
    } else {
        button.disabled = false;
        button.textContent = button.dataset.defaultLabel;
    }
}
