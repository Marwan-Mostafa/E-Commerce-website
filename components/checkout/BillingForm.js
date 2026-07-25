import {
    BillingField,
    FIELD_SELECTOR,
    reportFieldValidity,
} from "./BillingField.js";

const FORM_ID = "checkout-form";

const FORM_CLASS = `
flex
flex-col
`;
const SECTION_CLASS = `
flex
flex-col
gap-7
lg:gap-8
`;

const TITLE_CLASS = `
text-[36px]
font-bold
text-[#3A3A3A]
`;

const TWO_COLUMNS_CLASS = `
grid
grid-cols-1
lg:grid-cols-2
gap-6
`;


function trimClassList(classList) {
    return classList
        .split(/\s+/)
        .filter(Boolean)
        .join(" ");
}


const COUNTRY_OPTIONS = [
    { value: "Sri Lanka", label: "Sri Lanka" },
    { value: "Egypt", label: "Egypt" },
    { value: "Saudi Arabia", label: "Saudi Arabia" },
    { value: "United Arab Emirates", label: "United Arab Emirates" },
];

const BILLING_FIELDS = [
    {
        row: [
            {
                id: "firstName",
                name: "firstName",
                label: "First Name",
                required: true,
                autocomplete: "given-name",
                pattern: "^[A-Za-z ]+$",
                minLength: 2,
                maxLength: 40,
                placeholder: "Enter your first name",
            },
            {
                id: "lastName",
                name: "lastName",
                label: "Last Name",
                required: true,
                autocomplete: "family-name",
                pattern: "^[A-Za-z ]+$",
                minLength: 2,
                maxLength: 40,
                placeholder: "Enter your last name",
            },
        ],
    },
    {
        field: {
            id: "company",
            name: "company",
            label: "Company Name (Optional)",
            autocomplete: "organization",
            maxLength: 100,
            placeholder: "Company name",
        },
    },
    {
        field: {
            id: "country",
            name: "country",
            label: "Country / Region",
            type: "select",
            required: true,
            autocomplete: "country-name",
            options: COUNTRY_OPTIONS,
        },
    },
    {
        field: {
            id: "street",
            name: "street",
            label: "Street Address",
            required: true,
            autocomplete: "street-address",
            minLength: 5,
            maxLength: 120,
            placeholder: "Enter your street address",
        },
    },
    {
        row: [
            {
                id: "city",
                name: "city",
                label: "Town / City",
                required: true,
                autocomplete: "address-level2",
                minLength: 2,
                maxLength: 40,
                pattern: "^[A-Za-z ]+$",
                placeholder: "Town / City",
            },
            {
                id: "province",
                name: "province",
                label: "Province",
                required: true,
                autocomplete: "address-level1",
                minLength: 2,
                maxLength: 40,
                pattern: "^[A-Za-z ]+$",
                placeholder: "Province",
            },
        ],
    },
    {
        field: {
            id: "zip",
            name: "zip",
            label: "ZIP Code",
            required: true,
            autocomplete: "postal-code",
            inputMode: "numeric",
            pattern: "^\\d+$",
            minLength: 4,
            maxLength: 10,
            placeholder: "ZIP Code",
        },
    },
    {
        field: {
            id: "phone",
            name: "phone",
            type: "tel",
            label: "Phone",
            required: true,
            autocomplete: "tel",
            inputMode: "numeric",
            pattern: "^\\+?[0-9 ]{8,15}$",
            minLength: 8,
            maxLength: 15,
            placeholder: "Phone Number",
        },
    },
    {
        field: {
            id: "email",
            name: "email",
            type: "email",
            label: "Email Address",
            required: true,
            autocomplete: "email",
            maxLength: 100,
            placeholder: "Email Address",
        },
    },
    {
        field: {
            id: "notes",
            name: "notes",
            type: "textarea",
            label: "Order Notes (Optional)",
            maxLength: 500,
            placeholder: "Notes about your order, e.g. special notes for delivery.",
        },
    },
];


function withPrefix(field, prefix) {
    if (!prefix) {
        return field;
    }

    return {
        ...field,
        id: `${prefix}${field.id}`,
        name: `${prefix}${field.name}`,
    };
}

function prefixItem(item, prefix) {
    if (item.row) {
        return { row: item.row.map((field) => withPrefix(field, prefix)) };
    }

    if (item.field) {
        return { field: withPrefix(item.field, prefix) };
    }

    throw new Error(
        "BillingForm: each BILLING_FIELDS entry must have a `row` or `field` key."
    );
}


function renderField(field) {
    return BillingField(field);
}


function renderFieldRow(fields) {
    return `
        <div class="${trimClassList(TWO_COLUMNS_CLASS)}">
            ${fields.map(renderField).join("")}
        </div>
    `;
}


function renderFormItem(item) {
    return item.row ? renderFieldRow(item.row) : renderField(item.field);
}

export function getFormId(instanceId) {
    const prefix = instanceId ? `${instanceId}-` : "";
    return `${prefix}${FORM_ID}`;
}

export function BillingForm({ instanceId } = {}) {
    const prefix = instanceId ? `${instanceId}-` : "";
    const formId = getFormId(instanceId);
    const titleId = `${formId}-title`;

    const items = BILLING_FIELDS.map((item) => prefixItem(item, prefix));

    return `

    <form
    id="${formId}"
    class="${trimClassList(FORM_CLASS)}"
    novalidate>

    <section aria-labelledby="${titleId}" class="${trimClassList(SECTION_CLASS)}">
        <h2 id="${titleId}" class="${trimClassList(TITLE_CLASS)}">
            Billing Details
        </h2>

        ${items.map(renderFormItem).join("")}

    </section>

</form>

`

}

function focusInvalidControl(formElement, control) {
    if (control.type === "radio") {
        const groupError = formElement.querySelector(`#${CSS.escape(control.name)}-error`);
        if (groupError) {
            groupError.scrollIntoView({ block: "center", behavior: "smooth" });
            return;
        }
    }

    control.focus();
}

export function initBillingForm(formElement, { onValidSubmit } = {}) {
    if (!formElement) {
        return;
    }

    if (formElement.dataset.billingFormInit) {
        return;
    }
    formElement.dataset.billingFormInit = "true";

    const controls = formElement.querySelectorAll(FIELD_SELECTOR);

    controls.forEach((control) => {
        const revalidate = () => reportFieldValidity(formElement, control);

        control.addEventListener("input", revalidate);
        control.addEventListener("change", revalidate);
    });

    formElement.addEventListener("submit", (event) => {
        event.preventDefault();

        let firstInvalid = null;
        const checkedGroups = new Set();

        controls.forEach((control) => {
            if (control.type === "radio") {
                if (checkedGroups.has(control.name)) {
                    return;
                }
                checkedGroups.add(control.name);
            }

            const isValid = reportFieldValidity(formElement, control);

            if (!isValid && !firstInvalid) {
                firstInvalid = control;
            }
        });

        if (firstInvalid) {
            focusInvalidControl(formElement, firstInvalid);
            return;
        }

        onValidSubmit?.(new FormData(formElement));
    });
}