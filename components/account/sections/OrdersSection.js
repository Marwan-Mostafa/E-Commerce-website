const WRAPPER_CLASS = `
bg-white
rounded-[20px]
border
border-[#F2F2F2]
shadow-sm
p-10
`;

const TITLE_CLASS = `
text-[28px]
font-semibold
text-[#3A3A3A]
mb-8
`;

const CONTENT_CLASS = `
flex
flex-col
`;

const EMPTY_STATE_CLASS = `
text-[#9F9F9F]
text-[16px]
leading-7
`;

const CONTENT_ID = "account-orders-content";

function trimClassList(classList) {
    return classList
        .split(/\s+/)
        .filter(Boolean)
        .join(" ");
}

function renderEmptyState() {
    return `
        <p
            class="${trimClassList(EMPTY_STATE_CLASS)}"
            aria-live="polite">

            You haven't placed any orders yet.
            Your future orders will appear here.

        </p>
    `;
}

/**
 * Renders the orders section inside
 * the account dashboard.
 */
export function OrdersSection() {

    return `

        <section
            class="${trimClassList(WRAPPER_CLASS)}"
            aria-labelledby="orders-section-title">

            <h2
                id="orders-section-title"
                class="${trimClassList(TITLE_CLASS)}">

                My Orders

            </h2>

            <div
                id="${CONTENT_ID}"
                class="${trimClassList(CONTENT_CLASS)}">

                ${renderEmptyState()}

            </div>

        </section>

    `;

}