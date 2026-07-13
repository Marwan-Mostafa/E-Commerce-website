import { BlogList } from "./BlogList.js";
import { Sidebar } from "./Sidebar.js";

const LAYOUT_CLASS = `
grid
grid-cols-1
lg:grid-cols-[minmax(0,1fr)_380px]
gap-20
items-start
`;

const CONTENT_CLASS = `
min-w-0
`;

const SIDEBAR_CLASS = `
w-full
`;

export function BlogLayout({

    posts = [],

    categories = [],

    recentPosts = [],

} = {}) {

    return `

        <section
            class="${LAYOUT_CLASS}"
            aria-label="Blog Content">

            <div
                class="${CONTENT_CLASS}">

                ${BlogList(posts)}

            </div>

            <div
                class="${SIDEBAR_CLASS}">

                ${Sidebar({

        categories,

        recentPosts,

    })}

            </div>

        </section>

    `;

}