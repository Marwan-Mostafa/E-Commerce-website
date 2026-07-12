const WRAPPER_CLASS = `
bg-white
flex
flex-col
`

const TITLE_CLASS = `
text-[24px]
font-semibold
text-[#3A3A3A]
mb-10
`

const HEADER_CLASS = `
grid
grid-cols-[1fr_auto]
gap-10
pb-5
border-b
border-[#E8E8E8]
font-medium
text-[#3A3A3A]
`

const ITEM_CLASS = `
flex
justify-between
items-center
gap-6
py-5
`

const TOTAL_ROW_CLASS = `
flex
justify-between
items-center
py-5
`

const TOTAL_VALUE_CLASS = `
text-[#B88E2F]
text-[24px]
font-bold
`

const EMPTY_CLASS = `
py-12
text-center
text-[#9F9F9F]
`

const LIST_CLASS = `
flex
flex-col
divide-y
divide-[#F3F3F3]
`


function renderItem(item) {

    return `
        <li class="${ITEM_CLASS}" data-product-id="${item.id}">

            <div class="min-w-0">
                <p class="text-[#3A3A3A] break-words">
                    ${item.name}
                    <span class="text-[#9F9F9F]">
                        × ${item.quantity}
                    </span>
                </p>

            </div>

            <span class="whitespace-nowrap">
                ${item.formattedSubtotal}
            </span>
        </li>
    `
}

export function OrderSummary({ items = [], subtotal = "", total = "" } = {}) {

    return `

        <section
            class="${WRAPPER_CLASS}"
            aria-labelledby="order-summary-title">

            <h2
                id="order-summary-title"
                class="${TITLE_CLASS}">

                Order Summary

            </h2>

            <header class="${HEADER_CLASS}">

                <span>

                    Product

                </span>

                <span>

                    Subtotal

                </span>

            </header>

            <ul id="checkout-order-items" aria-live="polite" class="${LIST_CLASS}">

                ${items.length
            ? items.map(renderItem).join("")
            : `
            <li class="${EMPTY_CLASS}">
                Your cart is empty.
            </li>`}

            </ul>

            <div class="${TOTAL_ROW_CLASS}">
                <span class="font-medium">
                    Subtotal
                </span>

                <span id="checkout-subtotal" class="text-[#9F9F9F]">
                    ${subtotal}
                </span>

            </div>

            <div class="${TOTAL_ROW_CLASS}">

                <span class="font-semibold">
                    Total
                </span>

                <span id="checkout-total" class="${TOTAL_VALUE_CLASS}">
                    ${total}
                </span>
            </div>
        </section>
    `
}
