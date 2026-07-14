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


function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}


function trimClassList(classList) {
    return classList
        .split(/\s+/)
        .filter(Boolean)
        .join(" ");
}


function buildCommonAttributes({ id, name, type, required, autocomplete }) {
    const requiredAttr = required ? "required" : "";
    const autocompleteAttr = autocomplete
        ? `autocomplete="${escapeHtml(autocomplete)}"`
        : "";

    return `
        id="${escapeHtml(id)}"
        name="${escapeHtml(name)}"
        ${autocompleteAttr}
        ${requiredAttr}

        data-field="${escapeHtml(name)}"
        data-required="${required}"
        data-type="${escapeHtml(type)}"

        aria-invalid="false"
        aria-required="${required}"
        aria-describedby="${escapeHtml(id)}-error"
    `;
}


function renderInput({ commonAttributes, type, value, placeholder }) {
    return `
        <input
            ${commonAttributes}
            type="${escapeHtml(type)}"
            value="${escapeHtml(value)}"
            placeholder="${escapeHtml(placeholder)}"
            class="${trimClassList(INPUT_CLASS)}">
    `;
}


function renderTextarea({ commonAttributes, value, placeholder }) {
    return `
        <textarea
            ${commonAttributes}
            placeholder="${escapeHtml(placeholder)}"
            class="${trimClassList(TEXTAREA_CLASS)}">${escapeHtml(value)}</textarea>
    `;
}

function renderSelectOption(option, currentValue) {
    const isSelected = String(option.value) === String(currentValue);

    return `
        <option
            value="${escapeHtml(option.value)}"
            ${isSelected ? "selected" : ""}>
            ${escapeHtml(option.label)}
        </option>
    `;
}


function renderSelect({ commonAttributes, value, options }) {
    const placeholderSelected = value ? "" : "selected";

    return `
        <select
            ${commonAttributes}
            class="${trimClassList(SELECT_CLASS)}">

            <option value="" disabled ${placeholderSelected}>
                Select...
            </option>

            ${options.map(option => renderSelectOption(option, value)).join("")}

        </select>
    `;
}


function renderLabel({ id, label, required }) {
    return `
        <label
            for="${escapeHtml(id)}"
            class="${trimClassList(LABEL_CLASS)}">

            ${escapeHtml(label)}

            ${required ? `<span class="text-red-500">*</span>` : ""}

        </label>
    `;
}


function renderErrorMessage({ id }) {
    return `
        <p
            id="${escapeHtml(id)}-error"
            class="field-error ${trimClassList(ERROR_CLASS)}"
            aria-live="polite">
        </p>
    `;
}

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

    const commonAttributes = buildCommonAttributes({
        id,
        name,
        type,
        required,
        autocomplete,
    });

    let field = "";

    if (type === "textarea") {
        field = renderTextarea({ commonAttributes, value, placeholder });
    }

    else if (type === "select") {
        field = renderSelect({ commonAttributes, value, options });
    }

    else {
        field = renderInput({ commonAttributes, type, value, placeholder });
    }

    return `

        <div
            class="${trimClassList(WRAPPER_CLASS)}"
            data-field="${escapeHtml(name)}">

            ${renderLabel({ id, label, required })}

            ${field}

            ${renderErrorMessage({ id })}

        </div>

    `
}