import { renderNavbar } from "../../components/Navbar.js";
import { renderFooter } from "../../components/Footer.js";
import { renderFeaturesSection } from "../../components/FeaturesSection.js";
import { AccountLayout } from "../../components/account/AccountLayout.js";
import { setupWishlistBadge } from "../../modules/navbar/wishlistBadge.js";

const ROOTS = {

    navbar: document.getElementById("navbar-root"),
    account: document.getElementById("account-root"),
    features: document.getElementById("features-root"),
    footer: document.getElementById("footer-root"),

};

// Mock data for the account page

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


function renderLayout() {

    ROOTS.navbar.innerHTML =
        renderNavbar("account");

    setupWishlistBadge();

    ROOTS.features.innerHTML =
        renderFeaturesSection();

    ROOTS.footer.innerHTML =
        renderFooter();

}


function renderAccount() {

    ROOTS.account.innerHTML =

        AccountLayout({

            activeSection: "profile",

            profile: PROFILE,

            account: ACCOUNT,

        });

}


function handleSidebarNavigation(event) {

    const button = event.target.closest(

        "[data-account-section]"

    );

    if (!button) {

        return;

    }

    const section =

        button.dataset.accountSection;

    console.log(

        "[Account] Selected Section:",

        section

    );

}

function bindEvents() {

    document.addEventListener(

        "click",

        handleSidebarNavigation

    );

}


function bootstrap() {

    renderLayout();

    renderAccount();

    bindEvents();

}

bootstrap();