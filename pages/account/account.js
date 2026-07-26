import { renderNavbar } from "../../components/Navbar.js";
import { renderFooter } from "../../components/Footer.js";
import { renderFeaturesSection } from "../../components/FeaturesSection.js";

import { AccountLayout } from "../../components/account/AccountLayout.js";

import { setupWishlistBadge } from "../../modules/navbar/wishlistBadge.js";

import {
    getActiveSection,
    setActiveSection,
    subscribe,
} from "../../state/accountState.js";

const ROOTS = {
    navbar: document.getElementById("navbar-root"),
    account: document.getElementById("account-root"),
    features: document.getElementById("features-root"),
    footer: document.getElementById("footer-root"),
};

const PROFILE = {
    name: "Marwan Mostafa",
    role: "Mechanical Engineer • Frontend Developer",
    memberSince: "2026",
    avatar: "",
};

const ACCOUNT = {
    fullName: "Marwan Mostafa",
    email: "marwan@example.com",
    phone: "+20 100 000 0000",
    country: "Egypt",
    city: "Menoufia",
    address: "Shebin El-Kom",
};

let unsubscribeAccountState = null;

/**
 * Ensures all required DOM roots exist.
 */
function validateRoots() {

    const missingRoot = Object.entries(ROOTS).find(
        ([, element]) => !element
    );

    if (!missingRoot) {
        return true;
    }

    console.error(
        `[account] Missing root element: "${missingRoot[0]}".`
    );

    return false;

}

/**
 * Renders the static page layout.
 */
function renderLayout() {

    ROOTS.navbar.innerHTML = renderNavbar("account");

    setupWishlistBadge();

    ROOTS.features.innerHTML = renderFeaturesSection();

    ROOTS.footer.innerHTML = renderFooter();

}

/**
 * Renders the account dashboard.
 */
function renderAccount() {

    ROOTS.account.innerHTML = AccountLayout({

        activeSection: getActiveSection(),

        profile: PROFILE,

        account: ACCOUNT,

    });

}

/**
 * Handles sidebar navigation.
 */
function handleSidebarNavigation(event) {

    const button = event.target.closest(
        "[data-account-section]"
    );

    if (!button) {
        return;
    }

    setActiveSection(
        button.dataset.accountSection
    );

}

/**
 * Registers page events.
 */
function bindEvents() {

    ROOTS.account.addEventListener(
        "click",
        handleSidebarNavigation
    );

}

/**
 * Subscribes to account state updates.
 */
function subscribeToAccountState() {

    unsubscribeAccountState?.();

    unsubscribeAccountState = subscribe(
        renderAccount
    );

}

/**
 * Initializes the account page.
 */
function bootstrap() {

    if (!validateRoots()) {
        return;
    }

    renderLayout();

    bindEvents();

    subscribeToAccountState();

    renderAccount();

}

bootstrap();