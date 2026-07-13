import { ContactInfo } from "./ContactInfo.js";
import { ContactForm } from "./ContactForm.js";

const SECTION_CLASS = `
max-w-[1058px]
mx-auto

pt-24
pb-20

px-4
sm:px-6
lg:px-0
`;

const HEADER_CLASS = `
max-w-[650px]
mx-auto

text-center

mb-20
`;

const TITLE_CLASS = `
text-[36px]
font-semibold
text-[#3A3A3A]
`;

const DESCRIPTION_CLASS = `
mt-3

text-[16px]
leading-7

text-[#9F9F9F]
`;

const CONTENT_CLASS = `
grid
grid-cols-1
lg:grid-cols-[380px_1fr]
gap-16
xl:gap-28

items-start
`;

export function ContactSection() {

    return `

<section
    aria-labelledby="contact-section-title"
    class="${SECTION_CLASS}">

    <header class="${HEADER_CLASS}">

        <h2
            id="contact-section-title"
            class="${TITLE_CLASS}">

            Get In Touch With Us

        </h2>

        <p class="${DESCRIPTION_CLASS}">

            For More Information About Our Product & Services,
            Please Feel Free To Drop Us An Email.
            Our Staff Always Be There To Help You Out.
            Do Not Hesitate!

        </p>

    </header>

    <div class="${CONTENT_CLASS}">

        ${ContactInfo()}

        ${ContactForm()}

    </div>

</section>

`.trim();

}