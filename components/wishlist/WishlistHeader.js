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


function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}


function trimClassList(classList) {
    return classList.split(/\s+/).filter(Boolean).join(" ");
}


function normalizeCount(value) {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) && numericValue >= 0
        ? Math.trunc(numericValue)
        : 0;
}

export function WishlistHeader({ totalItems = 0 } = {}) {
    const safeTotalItems = normalizeCount(totalItems);
    const itemLabel = safeTotalItems === 1 ? "item" : "items";

    return `
        <section aria-labelledby="wishlist-title" class="${trimClassList(WRAPPER_CLASS)}">
            <div class="${trimClassList(TITLE_WRAPPER_CLASS)}">
                <h1 id="wishlist-title" class="${trimClassList(TITLE_CLASS)}">
                    Wishlist
                </h1>
                <p class="${trimClassList(DESCRIPTION_CLASS)}">
                    Save your favorite products and move them to your cart anytime.
                </p>
            </div>
            <div
                class="${trimClassList(COUNT_BADGE_CLASS)}"
                aria-label="${escapeHtml(safeTotalItems)} wishlist ${escapeHtml(itemLabel)}">
                ${escapeHtml(safeTotalItems)}
            </div>
        </section>
    `;
}