import { renderNavbar } from "../../components/Navbar.js";
import { renderFooter } from "../../components/Footer.js";
import { renderFeaturesSection } from "../../components/FeaturesSection.js";

import { ContactSection } from "../../components/contact/ContactSection.js";

const navbarRoot = document.getElementById("navbar-root");
const footerRoot = document.getElementById("footer-root");
const featuresRoot = document.getElementById("features-root");
const contactRoot = document.getElementById("contact-root");

function renderLayout() {

    navbarRoot.innerHTML = renderNavbar("contact");

    footerRoot.innerHTML = renderFooter();

    featuresRoot.innerHTML = renderFeaturesSection();

    contactRoot.innerHTML = ContactSection();

}

function validateField(field) {

    const wrapper = field.closest("div");

    if (!wrapper) return true;

    const errorElement = wrapper.querySelector(".field-error");

    field.classList.remove(
        "border-red-500",
        "focus:border-red-500"
    );

    if (errorElement) {

        errorElement.textContent = "";
        errorElement.classList.add("hidden");

    }

    if (field.checkValidity()) {

        return true;

    }

    field.classList.add(
        "border-red-500",
        "focus:border-red-500"
    );

    if (errorElement) {

        errorElement.textContent = field.validationMessage;
        errorElement.classList.remove("hidden");

    }

    return false;

}

function validateForm(form) {

    const fields = form.querySelectorAll(

        "input, textarea, select"

    );

    let isValid = true;

    fields.forEach(field => {

        if (!validateField(field)) {

            isValid = false;

        }

    });

    return isValid;

}

function handleInput(event) {

    const field = event.target;

    if (

        field.matches(

            "input, textarea, select"

        )

    ) {

        validateField(field);

    }

}

function handleSubmit(event) {

    event.preventDefault();

    const form = event.currentTarget;

    if (!validateForm(form)) {

        return;

    }

    const formData = Object.fromEntries(

        new FormData(form)

    );

    console.log(formData);

    alert("Message sent successfully.");

    form.reset();

}

function bindEvents() {

    document.addEventListener(

        "input",

        handleInput

    );

    document.addEventListener(

        "submit",

        event => {

            if (

                event.target.id !== "contact-form"

            ) {

                return;

            }

            handleSubmit(event);

        }

    );

}

function bootstrap() {

    renderLayout();

    bindEvents();

}

bootstrap();