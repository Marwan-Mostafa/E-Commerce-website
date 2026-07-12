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

export function BillingForm() {

    return `

    <form
    id="checkout-form"
    class="${FORM_CLASS}"
    autocomplete="on"
    novalidate>

    <section aria-labelledby="billing-details-title" class="${SECTION_CLASS}">
        <h2 id="billing-details-title" class="${TITLE_CLASS}">
            Billing Details
        </h2>

        <div class="${TWO_COLUMNS_CLASS}">

            ${BillingField({
        id: "firstName",
        name: "firstName",
        label: "First Name",
        required: true,
        autocomplete: "given-name",
    })}

            ${BillingField({
        id: "lastName",
        name: "lastName",
        label: "Last Name",
        required: true,
        autocomplete: "family-name",
    })}

        </div>

        ${BillingField({
        id: "company",
        name: "company",
        label: "Company Name (Optional)",
        autocomplete: "organization",
    })}

        ${BillingField({
        id: "country",
        name: "country",
        label: "Country / Region",
        type: "select",
        required: true,
        options: [
            {
                value: "Sri Lanka",
                label: "Sri Lanka",
            },
            {
                value: "Egypt",
                label: "Egypt",
            },
            {
                value: "Saudi Arabia",
                label: "Saudi Arabia",
            },
            {
                value: "UAE",
                label: "United Arab Emirates",
            },
        ],
    })}

        ${BillingField({
        id: "street",
        name: "street",
        label: "Street Address",
        required: true,
        autocomplete: "street-address",
    })}

        <div class="${TWO_COLUMNS_CLASS}">

            ${BillingField({
        id: "city",
        name: "city",
        label: "Town / City",
        required: true,
    })}

            ${BillingField({
        id: "province",
        name: "province",
        label: "Province",
        type: "select",
        required: true,
        options: [
            {
                value: "Western Province",
                label: "Western Province",
            },
        ],
    })}

        </div>

        ${BillingField({
        id: "zip",
        name: "zip",
        label: "ZIP Code",
        required: true,
        autocomplete: "postal-code",
    })}

        ${BillingField({
        id: "phone",
        name: "phone",
        label: "Phone",
        type: "tel",
        required: true,
        autocomplete: "tel",
    })}

        ${BillingField({
        id: "email",
        name: "email",
        label: "Email Address",
        type: "email",
        required: true,
        autocomplete: "email",
    })}

        ${BillingField({
        id: "notes",
        name: "notes",
        label: "Order Notes (Optional)",
        type: "textarea",
        placeholder:
            "Notes about your order, e.g. special notes for delivery.",
    })}

    </section>

</form>

`

}