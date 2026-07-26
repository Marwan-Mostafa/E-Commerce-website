const WRAPPER_CLASS = `
bg-white
rounded-[20px]
border
border-[#F2F2F2]
shadow-sm
p-10
`;

const HEADER_CLASS = `
flex
flex-col
gap-3
mb-10
`;

const TITLE_CLASS = `
text-[28px]
font-semibold
text-[#3A3A3A]
`;

const DESCRIPTION_CLASS = `
text-[16px]
leading-7
text-[#9F9F9F]
`;

const EMPTY_STATE_CLASS = `
flex
flex-col
items-center
justify-center
text-center
py-16
`;

const ICON_CLASS = `
fa-regular
fa-heart

text-[70px]

text-[#B88E2F]
mb-6
`;

const EMPTY_TITLE_CLASS = `
text-[24px]
font-semibold
text-[#3A3A3A]
mb-3
`;

const EMPTY_DESCRIPTION_CLASS = `
max-w-[460px]
text-[16px]
leading-7
text-[#9F9F9F]
mb-8
`;

const BUTTON_CLASS = `
inline-flex
items-center
justify-center

px-8
py-4

rounded-xl

bg-[#B88E2F]

text-white
font-medium

transition-colors
duration-300

hover:bg-[#A57D28]
`;

function trimClassList(classList) {
    return classList
        .split(/\s+/)
        .filter(Boolean)
        .join(" ");
}

export function WishlistSection() {

    return `

        <section
            class="${trimClassList(WRAPPER_CLASS)}"
            aria-labelledby="wishlist-title">

            <header
                class="${trimClassList(HEADER_CLASS)}">

                <h2
                    id="wishlist-title"
                    class="${trimClassList(TITLE_CLASS)}">

                    My Wishlist

                </h2>

                <p
                    class="${trimClassList(DESCRIPTION_CLASS)}">

                    Save your favorite products here and quickly access them whenever you're ready to purchase.

                </p>

            </header>

            <div
                class="${trimClassList(EMPTY_STATE_CLASS)}">

                <i
                    class="${trimClassList(ICON_CLASS)}"
                    aria-hidden="true">
                </i>

                <h3
                    class="${trimClassList(EMPTY_TITLE_CLASS)}">

                    Your wishlist is empty

                </h3>

                <p
                    class="${trimClassList(EMPTY_DESCRIPTION_CLASS)}">

                    You haven't added any products to your wishlist yet.
                    Browse the shop and save your favorite products to find them here later.

                </p>

                <a
                    href="../shop/shop.html"
                    class="${trimClassList(BUTTON_CLASS)}">

                    Explore Products

                </a>

            </div>

        </section>

    `;

}