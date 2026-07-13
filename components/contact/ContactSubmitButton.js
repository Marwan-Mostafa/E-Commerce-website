const BUTTON_CLASS = `
w-full
max-w-[237px]
h-[55px]

inline-flex
items-center
justify-center

rounded-[5px]

bg-[#B88E2F]
border
border-[#B88E2F]

text-white
text-[16px]
font-medium
tracking-[0.2px]

transition-all
duration-300

hover:bg-[#a37c27]
hover:border-[#a37c27]

focus:outline-none
focus:ring-4
focus:ring-[#B88E2F]/20

disabled:opacity-60
disabled:cursor-not-allowed
disabled:hover:bg-[#B88E2F]
disabled:hover:border-[#B88E2F]
`

export function ContactSubmitButton({

    text = "Submit",

    type = "submit",

    disabled = false,

    loading = false,

} = {}) {

    return `

<button
    type="${type}"
    ${disabled || loading ? "disabled" : ""}
    aria-disabled="${disabled || loading}"
    aria-busy="${loading}"
    class="${BUTTON_CLASS}">

    ${loading
            ? `
<span
    class="inline-flex items-center gap-3">

    <span
        class="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin">
    </span>

    Sending...

</span>
`
            : text}

</button>

`.trim();

}