const WRAPPER_CLASS = `
flex
flex-col
gap-9
`;

const TITLE_CLASS = `
text-[24px]
font-medium
text-[#000000]
`;

const LIST_CLASS = `
flex
flex-col
gap-10
`;

const ITEM_CLASS = `
flex
items-center
justify-between
text-[16px]
leading-none
`;

const NAME_CLASS = `
text-[#3A3A3A]
transition-colors
duration-300
hover:text-[#B88E2F]
`;

const COUNT_CLASS = `
text-[#9F9F9F]
`;

function CategoryItem(category) {

    return `

        <li
            class="${ITEM_CLASS}">

            <a
                href="#"
                class="${NAME_CLASS}"
                aria-label="${category.name} category">

                ${category.name}

            </a>

            <span
                class="${COUNT_CLASS}">

                ${category.count}

            </span>

        </li>

    `;

}

export function Categories(categories = []) {

    return `

        <section
            aria-labelledby="blog-categories-title"
            class="${WRAPPER_CLASS}">

            <h2
                id="blog-categories-title"
                class="${TITLE_CLASS}">

                Categories

            </h2>

            <ul
                class="${LIST_CLASS}">

                ${categories
            .map(CategoryItem)
            .join("")}

            </ul>

        </section>

    `;

}