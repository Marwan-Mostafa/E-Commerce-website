import { BillingField } from "./BillingField.js";

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
mb-2
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

export function BillingForm() {

    return `

    <form
    id="checkout-form"
    class="${trimClassList(FORM_CLASS)}"
    autocomplete="on"
    novalidate>

    <section aria-labelledby="billing-details-title" class="${trimClassList(SECTION_CLASS)}">
        <h2 id="billing-details-title" class="${trimClassList(TITLE_CLASS)}">
            Billing Details
        </h2>

        ${BILLING_FIELDS.map(renderFormItem).join("")}

    </section>

</form>

`

}