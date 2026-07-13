import { ContactField } from "./ContactField.js";
import { ContactSubmitButton } from "./ContactSubmitButton.js";

const WRAPPER_CLASS = `
flex
flex-col
gap-8
`;

const FORM_CLASS = `
flex
flex-col
gap-8
`;

export function ContactForm() {

    return `

<section
    aria-labelledby="contact-form-title"
    class="${WRAPPER_CLASS}">

    <h2
        id="contact-form-title"
        class="sr-only">

        Contact Form

    </h2>

    <form
        id="contact-form"
        novalidate
        autocomplete="on"
        class="${FORM_CLASS}">

        ${ContactField({

        id: "name",

        name: "name",

        label: "Your Name",

        placeholder: "Abc",

        autocomplete: "name",

        required: true,

    })}

        ${ContactField({

        id: "email",

        name: "email",

        label: "Email Address",

        type: "email",

        placeholder: "Abc@def.com",

        autocomplete: "email",

        required: true,

    })}

        ${ContactField({

        id: "subject",

        name: "subject",

        label: "Subject",

        placeholder: "This is optional",

        autocomplete: "off",

    })}

        ${ContactField({

        id: "message",

        name: "message",

        label: "Message",

        type: "textarea",

        placeholder: "Hi! I'd like to ask about...",

        required: true,

    })}

        ${ContactSubmitButton({

        text: "Submit",

    })}

    </form>

</section>

`;

}