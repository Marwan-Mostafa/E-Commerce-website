import { BlogCard } from "./BlogCard.js";

const WRAPPER_CLASS = `
flex
flex-col
gap-16
`;

const EMPTY_STATE_CLASS = `
flex
flex-col
items-center
justify-center
py-24
text-center
`;

const EMPTY_TITLE_CLASS = `
text-[26px]
font-semibold
text-[#3A3A3A]
`;

const EMPTY_DESCRIPTION_CLASS = `
mt-3
text-[#9F9F9F]
leading-7
max-w-md
`;

function EmptyPosts() {

    return `
        <section
            class="${EMPTY_STATE_CLASS}"
            aria-live="polite">

            <h2
                class="${EMPTY_TITLE_CLASS}">

                No blog posts found

            </h2>

            <p
                class="${EMPTY_DESCRIPTION_CLASS}">

                There are currently no articles available.
                Please check back later.

            </p>

        </section>
    `;

}

export function BlogList(posts = []) {

    if (!posts.length) {

        return EmptyPosts();

    }

    return `
        <section
            class="${WRAPPER_CLASS}"
            aria-label="Blog Posts">

            ${posts
            .map(post => BlogCard(post))
            .join("")}

        </section>
    `;

}