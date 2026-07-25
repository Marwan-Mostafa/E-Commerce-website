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

disabled:opacity-60
disabled:cursor-not-allowed
disabled:bg-[#F5F5F5]
disabled:hover:border-[#D7D7D7]
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

disabled:opacity-60
disabled:cursor-not-allowed
disabled:bg-[#F5F5F5]
disabled:hover:border-[#D7D7D7]
`;

const SELECT_CLASS = `
${INPUT_CLASS}
appearance-none
cursor-pointer
pr-11
`;

const FILE_CLASS = `
w-full
h-[60px]
flex
items-center
overflow-hidden
whitespace-nowrap
text-[15px]
text-[#3A3A3A]
bg-white
border
border-[#D7D7D7]
rounded-xl
outline-none
cursor-pointer
transition-all
duration-300
shadow-[0_1px_3px_rgba(0,0,0,.04)]

hover:border-[#B88E2F]

focus:border-[#B88E2F]
focus:ring-4
focus:ring-[#B88E2F]/10

file:h-full
file:mr-4
file:px-5
file:border-0
file:bg-[#B88E2F]
file:text-white
file:text-[15px]
file:font-semibold
file:cursor-pointer
file:transition-colors
file:duration-300
file:hover:bg-[#a17d29]

disabled:opacity-60
disabled:cursor-not-allowed
disabled:bg-[#F5F5F5]
disabled:hover:border-[#D7D7D7]
`;

const CHECKABLE_WRAPPER_CLASS = `
billing-field
flex
items-center
gap-3
`;

const CHECKABLE_INPUT_CLASS = `
w-5
h-5
shrink-0
border
border-[#D7D7D7]
bg-white
accent-[#B88E2F]
cursor-pointer
outline-none
transition-all
duration-200
focus:ring-4
focus:ring-[#B88E2F]/10
disabled:opacity-60
disabled:cursor-not-allowed
`;

const CHECKABLE_LABEL_CLASS = `
text-[15px]
text-[#3A3A3A]
select-none
cursor-pointer
`;

const ERROR_CLASS = `
hidden
text-[13px]
font-medium
text-red-500
pl-1
`;

const SENSITIVE_TYPES = new Set(["password"]);
const NON_TEXTUAL_TYPES = new Set(["select", "checkbox", "radio", "file"]);


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


function buildCommonAttributes({
    id,
    name,
    type,
    required,
    autocomplete,
    disabled = false,
    readOnly = false,
    pattern,
    minLength,
    maxLength,
    min,
    max,
    step,
    inputMode,
}) {
    const isTextual = !NON_TEXTUAL_TYPES.has(type);

    const requiredAttr = required ? "required" : "";
    const disabledAttr = disabled ? "disabled" : "";
    const readOnlyAttr = (readOnly && isTextual) ? "readonly" : "";
    const autocompleteAttr = autocomplete
        ? `autocomplete="${escapeHtml(autocomplete)}"`
        : "";
    const patternAttr = (isTextual && pattern)
        ? `pattern="${escapeHtml(pattern)}"`
        : "";
    const minLengthAttr = (isTextual && minLength !== undefined)
        ? `minlength="${escapeHtml(minLength)}"`
        : "";
    const maxLengthAttr = (isTextual && maxLength !== undefined)
        ? `maxlength="${escapeHtml(maxLength)}"`
        : "";
    const minAttr = (isTextual && min !== undefined) ? `min="${escapeHtml(min)}"` : "";
    const maxAttr = (isTextual && max !== undefined) ? `max="${escapeHtml(max)}"` : "";
    const stepAttr = (isTextual && step !== undefined) ? `step="${escapeHtml(step)}"` : "";
    const inputModeAttr = (isTextual && inputMode)
        ? `inputmode="${escapeHtml(inputMode)}"`
        : "";

    return `
        id="${escapeHtml(id)}"
        name="${escapeHtml(name)}"
        ${autocompleteAttr}
        ${requiredAttr}
        ${disabledAttr}
        ${readOnlyAttr}
        ${patternAttr}
        ${minLengthAttr}
        ${maxLengthAttr}
        ${minAttr}
        ${maxAttr}
        ${stepAttr}
        ${inputModeAttr}

        data-field="${escapeHtml(name)}"
        data-required="${required}"
        data-type="${escapeHtml(type)}"

        aria-invalid="false"
        aria-required="${required}"
        aria-disabled="${disabled}"
        aria-describedby="${escapeHtml(id)}-error"
    `;
}


function renderInput({ commonAttributes, type, value, placeholder, sensitive }) {
    const isSensitive = sensitive ?? SENSITIVE_TYPES.has(type);
    const renderedValue = isSensitive ? "" : escapeHtml(value);
    const hydrateAttr = isSensitive ? `data-hydrate-value="true"` : "";

    return `
        <input
            ${commonAttributes}
            type="${escapeHtml(type)}"
            value="${renderedValue}"
            placeholder="${escapeHtml(placeholder)}"
            ${hydrateAttr}
            class="${trimClassList(INPUT_CLASS)}">
    `;
}


function renderTextarea({ commonAttributes, value, placeholder, sensitive }) {
    const isSensitive = sensitive ?? false;
    const renderedValue = isSensitive ? "" : escapeHtml(value);
    const hydrateAttr = isSensitive ? `data-hydrate-value="true"` : "";

    return `
        <textarea
            ${commonAttributes}
            placeholder="${escapeHtml(placeholder)}"
            ${hydrateAttr}
            class="${trimClassList(TEXTAREA_CLASS)}">${renderedValue}</textarea>
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


function renderSelect({ commonAttributes, value, options, placeholder }) {
    const placeholderText = placeholder || "Select...";
    const placeholderSelected = value ? "" : "selected";

    return `
        <div class="relative">

            <select
                ${commonAttributes}
                class="${trimClassList(SELECT_CLASS)}">

                <option value="" disabled ${placeholderSelected}>
                    ${escapeHtml(placeholderText)}
                </option>

                ${options.map(option => renderSelectOption(option, value)).join("")}

            </select>

            <svg
                class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#3A3A3A]"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                aria-hidden="true">
                <path d="M5 7l5 5 5-5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

        </div>
    `;
}


function renderFile({ commonAttributes, placeholder }) {
    const titleAttr = placeholder ? `title="${escapeHtml(placeholder)}"` : "";

    return `
        <input
            ${commonAttributes}
            type="file"
            ${titleAttr}
            class="${trimClassList(FILE_CLASS)}">
    `;
}


function renderCheckable({ commonAttributes, type, value, checked }) {
    const checkedAttr = checked ? "checked" : "";
    const shapeClass = type === "radio" ? "rounded-full" : "rounded";

    return `
        <input
            ${commonAttributes}
            type="${escapeHtml(type)}"
            value="${escapeHtml(value)}"
            ${checkedAttr}
            class="${trimClassList(`${CHECKABLE_INPUT_CLASS} ${shapeClass}`)}">
    `;
}


function renderLabel({ id, label, required, className = LABEL_CLASS }) {
    return `
        <label
            for="${escapeHtml(id)}"
            class="${trimClassList(className)}">

            ${escapeHtml(label)}

            ${required ? `<span class="text-red-500" aria-hidden="true">*</span>` : ""}

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
    checked = false,
    disabled = false,
    readOnly = false,
    sensitive,
    pattern,
    minLength,
    maxLength,
    min,
    max,
    step,
    inputMode,
}) {

    const commonAttributes = buildCommonAttributes({
        id,
        name,
        type,
        required,
        autocomplete,
        disabled,
        readOnly,
        pattern,
        minLength,
        maxLength,
        min,
        max,
        step,
        inputMode,
    });

    if (type === "checkbox" || type === "radio") {
        const effectiveValue = value || (type === "radio" ? id : "on");

        return `

            <div
                class="${trimClassList(CHECKABLE_WRAPPER_CLASS)}"
                data-field="${escapeHtml(name)}">

                ${renderCheckable({ commonAttributes, type, value: effectiveValue, checked })}

                ${renderLabel({ id, label, required, className: CHECKABLE_LABEL_CLASS })}

                ${renderErrorMessage({ id })}

            </div>

        `;
    }

    let field = "";

    if (type === "textarea") {
        field = renderTextarea({ commonAttributes, value, placeholder, sensitive });
    }

    else if (type === "select") {
        field = renderSelect({ commonAttributes, value, options, placeholder });
    }

    else if (type === "file") {
        field = renderFile({ commonAttributes, placeholder });
    }

    else {
        field = renderInput({ commonAttributes, type, value, placeholder, sensitive });
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

export function setFieldError(root, fieldId, message) {
    const safeId = CSS.escape(fieldId);
    const control = root.querySelector(`#${safeId}`);
    const errorEl = root.querySelector(`#${safeId}-error`);

    if (control) {
        control.setAttribute("aria-invalid", "true");
    }

    if (errorEl) {
        errorEl.classList.remove("hidden");
        errorEl.textContent = message;
    }
}

export function clearFieldError(root, fieldId) {
    const safeId = CSS.escape(fieldId);
    const control = root.querySelector(`#${safeId}`);
    const errorEl = root.querySelector(`#${safeId}-error`);

    if (control) {
        control.setAttribute("aria-invalid", "false");
    }

    if (errorEl) {
        errorEl.textContent = "";
        errorEl.classList.add("hidden");
    }
}

export function hydrateSensitiveField(root, fieldId, value) {
    const control = root.querySelector(`#${CSS.escape(fieldId)}[data-hydrate-value="true"]`);

    if (control) {
        control.value = value ?? "";
    }
}