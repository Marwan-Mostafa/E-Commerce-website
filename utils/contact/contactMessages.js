const REQUIRED_MESSAGE = "This field is required.";

export const CONTACT_VALIDATION_MESSAGES = {

    name: {
        valueMissing: "Please enter your full name.",
    },

    email: {
        valueMissing: "Please enter your email address.",
        typeMismatch: "Please enter a valid email address.",
    },

    subject: {
        valueMissing: "Please enter the subject.",
    },

    message: {
        valueMissing: "Please enter your message.",
    },

    default: {
        valueMissing: REQUIRED_MESSAGE,
        typeMismatch: "Please enter a valid value.",
    },

};

export function getValidationMessage(field) {

    const fieldMessages =
        CONTACT_VALIDATION_MESSAGES[field.name] ??
        CONTACT_VALIDATION_MESSAGES.default;

    const validity = field.validity;

    if (validity.valueMissing) {

        return fieldMessages.valueMissing;

    }

    if (validity.typeMismatch) {

        return fieldMessages.typeMismatch;

    }

    return "";

}