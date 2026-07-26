import { AccountSidebar } from "./AccountSidebar.js";
import { AccountContent } from "./AccountContent.js";

const WRAPPER_CLASS = `
grid
grid-cols-1
lg:grid-cols-[320px_1fr]
gap-10
items-start
`;

const CONTENT_CLASS = `
flex
flex-col
gap-8
min-w-0
`;

const DASHBOARD_LABEL = "Account Dashboard";
const CONTENT_LABEL = "Account Content";

/**
 * Removes extra whitespace from class strings.
 */
function trimClassList(classList) {
    return classList
        .split(/\s+/)
        .filter(Boolean)
        .join(" ");
}

/**
 * Renders the account dashboard layout.
 */
export function AccountLayout({
    activeSection = "profile",
    profile = {},
    account = {},
} = {}) {

    return `

        <section
            class="${trimClassList(WRAPPER_CLASS)}"
            aria-label="${DASHBOARD_LABEL}">

            <!-- Sidebar -->

            ${AccountSidebar({
        activeSection,
    })}

            <!-- Dynamic Content -->

            <section
                class="${trimClassList(CONTENT_CLASS)}"
                aria-label="${CONTENT_LABEL}"
                aria-live="polite">

                ${AccountContent({
        activeSection,
        profile,
        account,
    })}

            </section>

        </section>

    `;

}