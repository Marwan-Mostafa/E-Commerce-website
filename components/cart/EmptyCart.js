const WRAPPER_CLASS = `
flex
flex-col
items-center
justify-center
text-center
py-24
`

const ICON_CLASS = `
fa-solid
fa-cart-shopping
text-6xl
text-[#D9D9D9]
`

const BUTTON_CLASS = `
inline-flex
items-center
justify-center
mt-8
px-8
py-4
border
border-[#3A3A3A]
rounded-[15px]
font-medium
transition-all
duration-300
hover:bg-[#B88E2F]
hover:border-[#B88E2F]
hover:text-white
`

export function EmptyCart() {

    return `
        <section
            class="${WRAPPER_CLASS}"
            aria-labelledby="empty-cart-title">

            <i
                class="${ICON_CLASS}"
                aria-hidden="true">
            </i>

            <h2 id="empty-cart-title"
                class="mt-8 text-3xl font-semibold text-[#3A3A3A]">
                Your Cart is Empty
            </h2>

            <p class="mt-3 max-w-md text-[#9F9F9F] leading-7">
                Looks like you haven't added any products to your shopping cart yet.
            </p>

            <a href="/pages/shop/shop.html" class="${BUTTON_CLASS}">
                Continue Shopping

            </a>

        </section>
    `
}