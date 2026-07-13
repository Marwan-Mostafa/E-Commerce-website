const WRAPPER_CLASS = `
relative
`;

const INPUT_CLASS = `
w-full
h-[58px]
pl-6
pr-16
rounded-[10px]
border
border-[#E5E5E5]
bg-white
text-[15px]
text-[#3A3A3A]
placeholder:text-[#9F9F9F]
outline-none
transition-all
duration-300

focus:border-[#B88E2F]
focus:ring-4
focus:ring-[#B88E2F]/10
`;

const BUTTON_CLASS = `
absolute
top-1/2
right-5
-translate-y-1/2

text-[18px]
text-[#3A3A3A]

transition-colors
duration-300

hover:text-[#B88E2F]
`;

export function SearchBox() {

    return `

        <form
            id="blog-search-form"
            role="search"
            autocomplete="off">

            <div class="${WRAPPER_CLASS}">

                <label
                    for="blog-search"
                    class="sr-only">

                    Search blog

                </label>

                <input
                    id="blog-search"
                    name="search"
                    type="search"
                    placeholder="Search..."
                    class="${INPUT_CLASS}">

                <button
                    type="submit"
                    aria-label="Search"
                    class="${BUTTON_CLASS}">

                    <i class="fa-solid fa-magnifying-glass"></i>

                </button>

            </div>

        </form>

    `;

}