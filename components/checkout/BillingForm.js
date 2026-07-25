import { BillingField, setFieldError, clearFieldError } from "./BillingField.js";

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
            },
            {
                id: "lastName",
                name: "lastName",
                label: "Last Name",
                required: true,
                autocomplete: "family-name",
            },
        ],
    },
    {
        field: {
            id: "company",
            name: "company",
            label: "Company Name (Optional)",
            autocomplete: "organization",
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
            },
            {
                id: "province",
                name: "province",
                label: "Province",
                required: true,
                autocomplete: "address-level1",
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
        },
    },
    {
        field: {
            id: "phone",
            name: "phone",
            label: "Phone",
            type: "tel",
            required: true,
            autocomplete: "tel",
            inputMode: "tel",
        },
    },
    {
        field: {
            id: "email",
            name: "email",
            label: "Email Address",
            type: "email",
            required: true,
            autocomplete: "email",
        },
    },
    {
        field: {
            id: "notes",
            name: "notes",
            label: "Order Notes (Optional)",
            type: "textarea",
            placeholder:
                "Notes about your order, e.g. special notes for delivery.",
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

export function BillingForm({ instanceId } = {}) {
    const prefix = instanceId ? `${instanceId}-` : "";
    const formId = `${prefix}${FORM_ID}`;
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

export function initBillingForm(formElement, { onValidSubmit } = {}) {
    if (!formElement) {
        return;
    }

    if (formElement.dataset.billingFormInit) {
        return;
    }
    formElement.dataset.billingFormInit = "true";

    const controls = formElement.querySelectorAll(
        "input[data-field], select[data-field], textarea[data-field]"
    );

    controls.forEach((control) => {
        const revalidate = () => {
            if (control.id && control.checkValidity()) {
                clearFieldError(formElement, control.id);
            }
        };

        control.addEventListener("input", revalidate);
        control.addEventListener("change", revalidate);
    });

    formElement.addEventListener("submit", (event) => {
        event.preventDefault();

        let firstInvalid = null;

        controls.forEach((control) => {
            const fieldId = control.id;

            if (!fieldId) {
                return;
            }

            if (control.checkValidity()) {
                clearFieldError(formElement, fieldId);
            } else {
                setFieldError(formElement, fieldId, control.validationMessage);
                firstInvalid = firstInvalid ?? control;
            }
        });

        if (firstInvalid) {
            firstInvalid.focus();
            return;
        }

        onValidSubmit?.(new FormData(formElement));
    });
}

export { FORM_ID };