import { ProfileSection } from "./sections/ProfileSection.js";
import { OrdersSection } from "./sections/OrdersSection.js";
import { WishlistSection } from "./sections/WishlistSection.js";
// import { AddressesSection } from "./sections/AddressesSection.js";
import { NotFoundSection } from "./sections/NotFoundSection.js";

const WRAPPER_CLASS = `
flex
flex-col
gap-8
`;

const CONTENT_LABEL = "Account Content";

const SECTION_REGISTRY = {
    profile: ProfileSection,
    orders: OrdersSection,
    wishlist: WishlistSection,
    // addresses: AddressesSection,
};

/**
 * TODO:
 * Move to a shared utility when duplicated
 * class helpers are consolidated.
 */
function trimClassList(classList) {
    return classList
        .split(/\s+/)
        .filter(Boolean)
        .join(" ");
}

/**
 * Renders the currently active account section.
 */
function renderActiveSection({
    activeSection,
    profile,
    account,
}) {

    const SectionComponent =
        SECTION_REGISTRY[activeSection];

    if (!SectionComponent) {
        return NotFoundSection({
            section: activeSection,
        });
    }

    if (activeSection === "profile") {
        return SectionComponent({
            profileData: profile,
            accountData: account,
        });
    }

    return SectionComponent();

}

/**
 * Renders the account content area.
 */
export function AccountContent({
    activeSection = "profile",
    profile = {},
    account = {},
} = {}) {

    return `

        <section
            class="${trimClassList(WRAPPER_CLASS)}"
            aria-label="${CONTENT_LABEL}"
            aria-live="polite">

            ${renderActiveSection({
        activeSection,
        profile,
        account,
    })}

        </section>

    `;

}