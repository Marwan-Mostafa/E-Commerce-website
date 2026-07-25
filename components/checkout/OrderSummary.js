const WRAPPER_CLASS = `
bg-white
flex
flex-col
`;

const TITLE_CLASS = `
text-[24px]
font-semibold
text-[#3A3A3A]
mb-10
`;

const HEADER_CLASS = `
grid
grid-cols-[1fr_auto]
gap-10
pb-5
border-b
border-[#E8E8E8]
font-medium
text-[#3A3A3A]
`;

const ITEM_CLASS = `
flex
justify-between
items-center
gap-6
py-5
`;

const ITEM_NAME_WRAPPER_CLASS = `
min-w-0
`;

const TOTAL_ROW_CLASS = `
flex
justify-between
items-center
py-5
`;

const TOTAL_LABEL_CLASS = `
font-medium
`;

const TOTAL_VALUE_CLASS = `
text-[#B88E2F]
text-[24px]
font-bold
`;

const EMPTY_CLASS = `
py-12
text-center
text-[#9F9F9F]
`;

const LIST_CLASS = `
flex
flex-col
divide-y
divide-[#F3F3F3]
`;

const SUMMARY_ROWS = Object.freeze([
    {
        id: "checkout-subtotal",
        label: "Subtotal",
        valueKey: "subtotal",
        labelClass: TOTAL_LABEL_CLASS,
        valueClass: "text-[#9F9F9F]",
    },
    {
        id: "checkout-total",
        label: "Total",
        valueKey: "total",
        labelClass: "font-semibold",
        valueClass: TOTAL_VALUE_CLASS,
    },
]);

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

function renderItemQuantity(quantity) {

    if (
        quantity === undefined ||
        quantity === null ||
        quantity === ""
    ) {
        return "";
    }

    return `
        <span class="text-[#9F9F9F]">
            × ${escapeHtml(quantity)}
        </span>
    `;
}

function renderItem(item) {

    const {
        id,
        name,
        quantity,
        formattedSubtotal,
    } = item;

    return `
        <li
            class="${trimClassList(ITEM_CLASS)}"
            data-product-id="${escapeHtml(id)}">

            <div class="${trimClassList(ITEM_NAME_WRAPPER_CLASS)}">

                <p class="text-[#3A3A3A] break-words">

                    ${escapeHtml(name)}
                    ${renderItemQuantity(quantity)}

                </p>

            </div>

            <span class="whitespace-nowrap">

                ${escapeHtml(formattedSubtotal ?? "")}

            </span>

        </li>
    `;
}

function renderItemsList(items) {

    if (items.length === 0) {
        return `
            <li class="${trimClassList(EMPTY_CLASS)}">

                Your cart is empty.

            </li>
        `;
    }

    return items
        .map(renderItem)
        .join("");

}

function renderSummaryRow(row, values) {

    const value = values[row.valueKey] ?? "";

    return `
        <div class="${trimClassList(TOTAL_ROW_CLASS)}">

            <span class="${trimClassList(row.labelClass ?? "")}">

                ${escapeHtml(row.label)}

            </span>

            <span
                id="${escapeHtml(row.id)}"
                class="${trimClassList(row.valueClass ?? "")}">

                ${escapeHtml(value)}

            </span>

        </div>
    `;
}

export function OrderSummary({
    items = [],
    subtotal = "",
    total = "",
} = {}) {

    const summaryValues = {
        subtotal,
        total,
    };

    return `

        <section
            class="${trimClassList(WRAPPER_CLASS)}"
            aria-labelledby="order-summary-title">

            <h2
                id="order-summary-title"
                class="${trimClassList(TITLE_CLASS)}">

                Order Summary

            </h2>

            <header
                class="${trimClassList(HEADER_CLASS)}">

                <span>

                    Product

                </span>

                <span>

                    Subtotal

                </span>

            </header>

            <ul
                id="checkout-order-items"
                class="${trimClassList(LIST_CLASS)}"
                aria-live="polite">

                ${renderItemsList(items)}

            </ul>

            ${SUMMARY_ROWS
            .map((row) => renderSummaryRow(row, summaryValues))
            .join("")}

        </section>

    `;
}