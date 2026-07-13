const WRAPPER_CLASS = `
flex
flex-col
items-center
justify-center
text-center

py-24

rounded-[20px]

border
border-[#F2F2F2]

bg-[#FCFCFC]
`;

const ICON_WRAPPER_CLASS = `
w-24
h-24

flex
items-center
justify-center

rounded-full

bg-[#FFF3E3]

text-[#B88E2F]

text-[40px]

mb-8
`;

const TITLE_CLASS = `
text-[32px]
font-semibold
text-[#3A3A3A]

mb-4
`;

const DESCRIPTION_CLASS = `
max-w-[520px]

text-[#9F9F9F]

leading-8

mb-10
`;

const BUTTON_CLASS = `
inline-flex
items-center
justify-center

h-14

px-10

rounded-[12px]

bg-[#B88E2F]

text-white

font-medium

transition-all
duration-300

hover:bg-[#A67C1F]
hover:-translate-y-[2px]

focus:outline-none
focus:ring-4
focus:ring-[#B88E2F]/30
`;

export function WishlistEmpty() {

    return `

        <section
            class="${WRAPPER_CLASS}"
            aria-labelledby="wishlist-empty-title">

            <div
                class="${ICON_WRAPPER_CLASS}"
                aria-hidden="true">

                <i class="fa-regular fa-heart"></i>

            </div>

            <h2
                id="wishlist-empty-title"
                class="${TITLE_CLASS}">

                Your wishlist is empty

            </h2>

            <p
                class="${DESCRIPTION_CLASS}">

                You haven't added any products yet.

                Explore our collection and save your
                favorite products to your wishlist.

            </p>

            <a
                href="/pages/shop/shop.html"
                class="${BUTTON_CLASS}">

                Continue Shopping

            </a>

        </section>

    `;

}