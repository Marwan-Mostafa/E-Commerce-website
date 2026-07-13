import { renderNavbar } from "../../components/Navbar.js";
import { renderFooter } from "../../components/Footer.js";
import { renderFeaturesSection } from "../../components/FeaturesSection.js";
import { renderPagination } from "../../components/Pagination.js";
import { setupWishlistBadge } from "../../modules/navbar/wishlistBadge.js";
import { BlogLayout } from "../../components/blog/BlogLayout.js";

import { getBlogPosts } from "./blogData.js";

const ROOTS = {

    navbar: document.getElementById("navbar-root"),

    blog: document.getElementById("blog-root"),

    pagination: document.getElementById("pagination-root"),

    features: document.getElementById("features-root"),

    footer: document.getElementById("footer-root"),

};

function buildCategories(posts) {

    const categoryMap = new Map();

    posts.forEach(post => {

        const current = categoryMap.get(post.category) ?? 0;

        categoryMap.set(

            post.category,

            current + 1

        );

    });

    return [...categoryMap.entries()].map(

        ([name, count]) => ({

            name,

            count,

        })

    );

}

function buildRecentPosts(posts) {

    return [...posts]

        .sort(

            (a, b) =>

                new Date(b.date) -

                new Date(a.date)

        )

        .slice(0, 5);

}

function renderLayout() {

    ROOTS.navbar.innerHTML =

        renderNavbar("blog");

    ROOTS.features.innerHTML =

        renderFeaturesSection();

    ROOTS.footer.innerHTML =

        renderFooter();

}

function renderBlog() {

    const posts = getBlogPosts();

    ROOTS.blog.innerHTML = BlogLayout({

        posts,

        categories: buildCategories(posts),

        recentPosts: buildRecentPosts(posts),

    });

}

function Pagination() {

    ROOTS.pagination.innerHTML = renderPagination({

        currentPage: 1,

        totalPages: 3,

    });

}

function bindEvents() {

    document.addEventListener(

        "submit",

        handleSearch

    );

}

function handleSearch(event) {

    if (

        event.target.id !==

        "blog-search-form"

    ) {

        return;

    }

    event.preventDefault();

    const search = new FormData(

        event.target

    ).get("search");

    console.log(

        "Search:",

        search

    );

}

function bootstrap() {

    renderLayout();

    renderBlog();

    Pagination();

    bindEvents();

}

bootstrap();