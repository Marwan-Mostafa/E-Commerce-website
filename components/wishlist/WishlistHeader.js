const WRAPPER_CLASS = `
flex
flex-col
gap-4
md:flex-row
md:items-center
md:justify-between
`;

const TITLE_WRAPPER_CLASS = `
flex
flex-col
gap-2
`;

const TITLE_CLASS = `
text-[40px]
font-semibold
text-[#3A3A3A]
leading-none
`;

const DESCRIPTION_CLASS = `
text-[#9F9F9F]
text-[16px]
leading-7
`;

const COUNT_BADGE_CLASS = `
inline-flex
items-center
justify-center

min-w-[52px]
h-12

px-6

rounded-full

bg-[#B88E2F]
text-white

font-semibold
text-[16px]

shadow-sm
`;

export function WishlistHeader({

    totalItems = 0,

} = {}) {

    const itemLabel =

        totalItems === 1

            ? "item"

            : "items";

    return `

        <section
            aria-labelledby="wishlist-title"
            class="${WRAPPER_CLASS}">

            <div
                class="${TITLE_WRAPPER_CLASS}">

                <h1
                    id="wishlist-title"
                    class="${TITLE_CLASS}">

                    Wishlist

                </h1>

                <p
                    class="${DESCRIPTION_CLASS}">

                    Save your favorite products and
                    move them to your cart anytime.

                </p>

            </div>

            <div
                class="${COUNT_BADGE_CLASS}"
                aria-label="${totalItems} wishlist ${itemLabel}">

                ${totalItems}

            </div>

        </section>

    `;

}