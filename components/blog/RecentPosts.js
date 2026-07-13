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
gap-5
`;

const IMAGE_WRAPPER_CLASS = `
w-20
h-20
rounded-[10px]
overflow-hidden
flex-shrink-0
`;

const IMAGE_CLASS = `
w-full
h-full
object-cover
transition-transform
duration-300
hover:scale-105
`;

const CONTENT_CLASS = `
flex
flex-col
justify-center
gap-2
min-w-0
`;

const POST_TITLE_CLASS = `
text-[14px]
leading-5
text-[#3A3A3A]
transition-colors
duration-300
hover:text-[#B88E2F]
line-clamp-2
`;

const DATE_CLASS = `
text-[12px]
text-[#9F9F9F]
`;

function RecentPostItem(post) {

    return `

        <li>

            <article
                class="${ITEM_CLASS}">

                <a
                    href="#"
                    class="${IMAGE_WRAPPER_CLASS}"
                    aria-label="${post.title}">

                    <img
                        src="${post.image}"
                        alt="${post.title}"
                        loading="lazy"
                        class="${IMAGE_CLASS}">

                </a>

                <div
                    class="${CONTENT_CLASS}">

                    <a
                        href="#"
                        class="${POST_TITLE_CLASS}">

                        ${post.title}

                    </a>

                    <time
                        datetime="${post.date}"
                        class="${DATE_CLASS}">

                        ${post.date}

                    </time>

                </div>

            </article>

        </li>

    `;

}

export function RecentPosts(posts = []) {

    return `

        <section
            aria-labelledby="recent-posts-title"
            class="${WRAPPER_CLASS}">

            <h2
                id="recent-posts-title"
                class="${TITLE_CLASS}">

                Recent Posts

            </h2>

            <ul
                class="${LIST_CLASS}">

                ${posts
            .map(RecentPostItem)
            .join("")}

            </ul>

        </section>

    `;

}