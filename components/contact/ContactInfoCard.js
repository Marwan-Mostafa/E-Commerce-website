const CARD_CLASS = `
flex
items-start
gap-7
`;

const ICON_WRAPPER_CLASS = `
w-8
flex
justify-center
items-start
pt-1
shrink-0
`;

const ICON_CLASS = `
text-[22px]
text-black
`;

const CONTENT_CLASS = `
flex
flex-col
gap-2
min-w-0
`;

const TITLE_CLASS = `
text-[24px]
font-medium
leading-none
text-[#000000]
break-words
`;

const DESCRIPTION_CLASS = `
text-[16px]
leading-7
text-[#3A3A3A]
`;

export function ContactInfoCard({

    id = "",

    icon = "",

    title = "",

    lines = [],

    semantic = "div",

} = {}) {

    const safeLines = Array.isArray(lines)
        ? lines
        : [];

    const WrapperTag =
        semantic === "address"
            ? "address"
            : "div";

    return `
<article
    class="${CARD_CLASS}"
    aria-labelledby="contact-${id}-title">

    <div class="${ICON_WRAPPER_CLASS}">

        ${icon
            ? `
<i
    class="${icon} ${ICON_CLASS}"
    aria-hidden="true">
</i>
`
            : ""
        }

    </div>

    <div class="${CONTENT_CLASS}">

        <h3
            id="contact-${id}-title"
            class="${TITLE_CLASS}">

            ${title}

        </h3>

        <${WrapperTag}
            class="${DESCRIPTION_CLASS}${semantic === "address" ? " not-italic" : ""}">

            ${safeLines
            .map(line => `<p>${line}</p>`)
            .join("")}

        </${WrapperTag}>

    </div>

</article>
`.trim();

}