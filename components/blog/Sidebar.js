import { SearchBox } from "./SearchBox.js";
import { Categories } from "./Categories.js";
import { RecentPosts } from "./RecentPosts.js";

const SIDEBAR_CLASS = `
flex
flex-col
gap-14
`;

export function Sidebar({

    categories = [],

    recentPosts = [],

} = {}) {

    return `

        <aside
            class="${SIDEBAR_CLASS}"
            aria-label="Blog Sidebar">

            ${SearchBox()}

            ${Categories(categories)}

            ${RecentPosts(recentPosts)}

        </aside>

    `;

}