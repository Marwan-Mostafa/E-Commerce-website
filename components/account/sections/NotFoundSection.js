const WRAPPER_CLASS = `
bg-white
rounded-[20px]
border
border-[#F2F2F2]
shadow-sm
p-12
`;

const CONTENT_CLASS = `
flex
flex-col
items-center
justify-center
text-center
gap-6
max-w-[600px]
mx-auto
`;

const ICON_CLASS = `
fa-regular
fa-folder-open
text-[64px]
text-[#B88E2F]
`;

const TITLE_CLASS = `
text-[32px]
font-semibold
text-[#3A3A3A]
`;

const DESCRIPTION_CLASS = `
text-[16px]
leading-7
text-[#9F9F9F]
`;

const SECTION_NAME_CLASS = `
font-semibold
text-[#B88E2F]
`;

const TITLE = "Section Not Found";

function trimClassList(classList) {
    return classList
        .split(/\s+/)
        .filter(Boolean)
        .join(" ");
}

function escapeHtml(input) {
    return String(input ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export function NotFoundSection({
    section = "",
} = {}) {

    const sectionName = escapeHtml(
        section || "Unknown"
    );

    return `

        <section
            class="${trimClassList(WRAPPER_CLASS)}"
            aria-labelledby="not-found-title"
            role="status">

            <div
                class="${trimClassList(CONTENT_CLASS)}">

                <i
                    class="${trimClassList(ICON_CLASS)}"
                    aria-hidden="true"
                    focusable="false">
                </i>

                <h2
                    id="not-found-title"
                    class="${trimClassList(TITLE_CLASS)}">

                    ${TITLE}

                </h2>

                <p
                    class="${trimClassList(DESCRIPTION_CLASS)}">

                    The requested section

                    <span class="${trimClassList(SECTION_NAME_CLASS)}">

                        ${sectionName}

                    </span>

                    is unavailable or does not exist.

                </p>

            </div>

        </section>

    `;

}