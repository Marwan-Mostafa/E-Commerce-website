import { getValidationMessage } from "./contactMessages.js";

const ERROR_CLASS = "field-error";

const INVALID_INPUT_CLASSES = [
    "border-red-500",
    "focus:border-red-500",
];

function getErrorElement(field) {

    return field
        .closest("div")
        ?.querySelector(`.${ERROR_CLASS}`);

}

function clearFieldError(field, errorElement) {

    field.classList.remove(...INVALID_INPUT_CLASSES);

    if (!errorElement) return;

    errorElement.textContent = "";

    errorElement.classList.add("hidden");

}

function showFieldError(field, errorElement, message) {

    field.classList.add(...INVALID_INPUT_CLASSES);

    if (!errorElement) return;

    errorElement.textContent = message;

    errorElement.classList.remove("hidden");

}

export function validateField(field) {

    const errorElement = getErrorElement(field);

    clearFieldError(field, errorElement);

    if (field.checkValidity()) {

        return true;

    }

    showFieldError(

        field,

        errorElement,

        getValidationMessage(field)

    );

    return false;

}

export function validateForm(form) {

    const fields = form.querySelectorAll(

        "input, textarea, select"

    );

    let firstInvalidField = null;

    let isValid = true;

    fields.forEach(field => {

        const valid = validateField(field);

        if (!valid) {

            isValid = false;

            if (!firstInvalidField) {

                firstInvalidField = field;

            }

        }

    });

    firstInvalidField?.focus();

    return isValid;

}

export function clearFormValidation(form) {

    const fields = form.querySelectorAll(

        "input, textarea, select"

    );

    fields.forEach(field => {

        const errorElement = getErrorElement(field);

        clearFieldError(field, errorElement);

    });

}