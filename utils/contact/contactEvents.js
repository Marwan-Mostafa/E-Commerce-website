import {

    validateField,

    validateForm,

    clearFormValidation,

} from "./contactValidation.js";

export function bindContactForm({ form, onSubmit, }) {

    if (!form) {
        return
    }

    form.addEventListener("input", handleInput);

    form.addEventListener("blur", handleBlur, true);

    form.addEventListener("submit",

        event => handleSubmit(event, onSubmit)

    );

}

function handleInput(event) {

    const field = event.target;

    if (!isFormField(field)) {
        return;
    }

    validateField(field);

}

function handleBlur(event) {

    const field = event.target;

    if (!isFormField(field)) {
        return
    }

    validateField(field);

}

function handleSubmit(
    event,
    onSubmit
) {

    event.preventDefault();
    const form = event.currentTarget;

    if (!validateForm(form)) {
        return;
    }

    const formData = Object.fromEntries(new FormData(form));

    onSubmit?.(formData, form);

}



function isFormField(element) {
    return element.matches("input, textarea, select");
}