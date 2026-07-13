const WRAPPER_CLASS = `
flex
flex-col
gap-3
`;

const LABEL_CLASS = `
text-[16px]
font-medium
text-[#3A3A3A]
select-none
`;

const CONTROL_BASE_CLASS = `
w-full
px-7
bg-white
border
border-[#D9D9D9]
rounded-[10px]
text-[16px]
text-[#3A3A3A]
placeholder:text-[#9F9F9F]
outline-none
transition-all
duration-300

hover:border-[#B88E2F]

focus:border-[#B88E2F]
focus:ring-4
focus:ring-[#B88E2F]/10
`;

const INPUT_CLASS = `
${CONTROL_BASE_CLASS}
h-[75px]
`;

const TEXTAREA_CLASS = `
${CONTROL_BASE_CLASS}
min-h-[120px]
py-6
resize-none
`;

const ERROR_CLASS = `
hidden
text-[13px]
font-medium
text-red-500
`;

function buildCommonAttributes({
    id,
    name,
    placeholder,
    autocomplete,
    required,
    inputMode,
    describedBy,
}) {

    return `
        id="${id}"
        name="${name}"
        ${placeholder ? `placeholder="${placeholder}"` : ""}
        ${autocomplete ? `autocomplete="${autocomplete}"` : ""}
        ${inputMode ? `inputmode="${inputMode}"` : ""}
        ${required ? "required aria-required=\"true\"" : ""}
        aria-describedby="${describedBy}"
        aria-invalid="false"
    `;

}

function renderInput(props) {

    return `
        <input
            type="${props.type}"
            value="${props.value}"
            ${buildCommonAttributes(props)}
            class="${INPUT_CLASS}">
    `;

}

function renderTextarea(props) {

    return `
        <textarea
            ${buildCommonAttributes(props)}
            spellcheck="true"
            class="${TEXTAREA_CLASS}">${props.value}</textarea>
    `;

}

function renderControl(props) {

    if (props.type === "textarea") {

        return renderTextarea(props);

    }

    return renderInput(props);

}

export function ContactField({

    id = "",

    name = "",

    label = "",

    type = "text",

    value = "",

    placeholder = "",

    autocomplete = "",

    required = false,

} = {}) {

    const errorId = `${id}-error`;

    let inputMode = "";

    switch (type) {

        case "email":
            inputMode = "email";
            break;

        case "tel":
            inputMode = "tel";
            break;

        case "number":
            inputMode = "numeric";
            break;

        default:
            inputMode = "";
    }

    return `
<div class="${WRAPPER_CLASS}">

    <label
        for="${id}"
        class="${LABEL_CLASS}">

        ${label}

        ${required
            ? `
<span
    class="text-red-500"
    aria-hidden="true">
    *
</span>
`
            : ""
        }

    </label>

    ${renderControl({

            id,

            name,

            type,

            value,

            placeholder,

            autocomplete,

            required,

            inputMode,

            describedBy: errorId,

        })}

    <p
        id="${errorId}"
        class="field-error ${ERROR_CLASS}"
        aria-live="polite">
    </p>

</div>
`.trim();

}