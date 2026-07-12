const WRAPPER_CLASS = `
billing-field
flex
flex-col
gap-2
`;

const LABEL_CLASS = `
text-[15px] 
font-semibold
tracking-[0.2px]
text-[#3A3A3A]
select-none
`;

const INPUT_CLASS = `
w-full
h-[60px]
px-5
text-[15px]
text-[#3A3A3A]
placeholder:text-[#9F9F9F]
bg-white
border
border-[#D7D7D7]
rounded-xl
outline-none
transition-all
duration-300
shadow-[0_1px_3px_rgba(0,0,0,.04)]

hover:border-[#B88E2F]

focus:border-[#B88E2F]
focus:ring-4
focus:ring-[#B88E2F]/10
`;

const TEXTAREA_CLASS = `
w-full
min-h-[140px]
px-5
py-4
text-[15px]
text-[#3A3A3A]
placeholder:text-[#9F9F9F]
bg-white
border
border-[#D7D7D7]
rounded-xl
resize-none
outline-none
transition-all
duration-300
shadow-[0_1px_3px_rgba(0,0,0,.04)]

hover:border-[#B88E2F]

focus:border-[#B88E2F]
focus:ring-4
focus:ring-[#B88E2F]/10
`;

const SELECT_CLASS = `
${INPUT_CLASS}
appearance-none
cursor-pointer
`;

const ERROR_CLASS = `
hidden
text-[13px]
font-medium
text-red-500
pl-1
`;

export function BillingField({
    id,
    name,
    label,
    type = "text",
    value = "",
    placeholder = "",
    required = false,
    autocomplete = "",
    options = [],
}) {

    const requiredAttr = required ? "required" : "";

    const commonAttributes = `
        id="${id}"
        name="${name}"
        autocomplete="${autocomplete}"
        ${requiredAttr}

        data-field="${name}"
        data-required="${required}"
        data-type="${type}"

        aria-invalid="false"
        aria-describedby="${id}-error"
    `;

    let field = "";

    if (type === "textarea") {

        field = `
            <textarea
                ${commonAttributes}
                placeholder="${placeholder}"
                class="${TEXTAREA_CLASS}">${value}</textarea>
        `;

    }

    else if (type === "select") {

        field = `
            <select
                ${commonAttributes}
                class="${SELECT_CLASS}">

                <option value="" disabled selected>
                    Select...
                </option>

                ${options.map(option => `
                    <option
                        value="${option.value}">
                        ${option.label}
                    </option>
                `).join("")}

            </select>
        `;

    }

    else {

        field = `
            <input
                ${commonAttributes}
                type="${type}"
                value="${value}"
                placeholder="${placeholder}"
                class="${INPUT_CLASS}">
        `;

    }

    return `

        <div
            class="${WRAPPER_CLASS}"
            data-field="${name}">

            <label
                for="${id}"
                class="${LABEL_CLASS}">

                ${label}

                ${required
            ? `<span class="text-red-500">*</span>`
            : ""}

            </label>

            ${field}

            <p
                id="${id}-error"
                class="field-error ${ERROR_CLASS}"
                aria-live="polite">
            </p>

        </div>

    `
}