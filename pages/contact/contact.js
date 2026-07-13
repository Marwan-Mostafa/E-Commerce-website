import { renderNavbar } from "../../components/Navbar.js";
import { renderFooter } from "../../components/Footer.js";
import { renderFeaturesSection } from "../../components/FeaturesSection.js";
import { ContactSection } from "../../components/contact/ContactSection.js";
import { setupWishlistBadge } from "../../modules/navbar/wishlistBadge.js";
import {
    bindContactForm,
} from "../../utils/contact/contactEvents.js";

const ROOTS = {
    navbar: document.getElementById("navbar-root"),
    footer: document.getElementById("footer-root"),
    features: document.getElementById("features-root"),
    contact: document.getElementById("contact-root"),

};

function renderNavbarSection() {
    ROOTS.navbar.innerHTML = renderNavbar("contact");
}

function renderContactSection() {
    ROOTS.contact.innerHTML = ContactSection();
}

function renderFeatures() {
    ROOTS.features.innerHTML = renderFeaturesSection();
}

function renderFooterSection() {
    ROOTS.footer.innerHTML = renderFooter();
}
function renderPage() {
    renderNavbarSection();
    renderContactSection();
    renderFeatures();
    renderFooterSection();
}

function initializeContactForm() {

    const form = document.getElementById("contact-form");

    if (!form) {
        console.warn("[Contact] Contact form was not found.")
        return;
    }

    bindContactForm({ form, onSubmit: handleSuccessfulSubmit, });

}

function handleSuccessfulSubmit(formData, form) {

    console.group("📨 Contact Form");
    console.table(formData);
    console.groupEnd();
    alert("Your message has been sent successfully.");
    form.reset();

}

function bootstrap() {
    renderPage();
    initializeContactForm();
}

bootstrap();