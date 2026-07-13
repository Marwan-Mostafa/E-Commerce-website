import { BlogMeta } from "./BlogMeta.js";

const ARTICLE_CLASS = `
flex
flex-col
gap-8
`;

const IMAGE_WRAPPER_CLASS = `
overflow-hidden
rounded-[10px]
`;

const IMAGE_CLASS = `
w-full
h-auto
object-cover
transition-transform
duration-500
hover:scale-[1.03]
`;

const CONTENT_CLASS = `
flex
flex-col
gap-5
`;

const TITLE_CLASS = `
text-[30px]
font-medium
leading-tight
text-[#3A3A3A]
`;

const EXCERPT_CLASS = `
text-[15px]
leading-7
text-[#9F9F9F]
`;

const LINK_CLASS = `
inline-flex
flex-col
items-start
gap-2
w-fit
text-[16px]
font-medium
text-black
transition-all
duration-300
hover:text-[#B88E2F]
`;

const UNDERLINE_CLASS = `
w-full
h-[2px]
bg-black
transition-all
duration-300
group-hover:bg-[#B88E2F]
`;

export function BlogCard(post) {

    return `

        <article
            class="${ARTICLE_CLASS}">

            <div
                class="${IMAGE_WRAPPER_CLASS}">

                <img
                    src="${post.image}"
                    alt="${post.title}"
                    loading="lazy"
                    class="${IMAGE_CLASS}">

            </div>

            <div
                class="${CONTENT_CLASS}">

                ${BlogMeta({

        author: post.author,

        date: post.date,

        category: post.category,

    })}

                <h2
                    class="${TITLE_CLASS}">

                    ${post.title}

                </h2>

                <p
                    class="${EXCERPT_CLASS}">

                    ${post.excerpt}

                </p>

                <a
                    href="#"
                    class="group ${LINK_CLASS}"
                    aria-label="Read more about ${post.title}">

                    <span>

                        Read More

                    </span>

                    <span
                        class="${UNDERLINE_CLASS}">

                    </span>

                </a>

            </div>

        </article>

    `;

}