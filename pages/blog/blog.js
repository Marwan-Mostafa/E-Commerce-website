import { posts } from '../../data/posts.js';
import { renderBlogPostCard } from '../../components/BlogPostCard.js';
import { renderCategories, renderRecentPosts } from '../../components/BlogSidebar.js';
import { renderPagination } from '../../components/Pagination.js';

const POSTS_PER_PAGE = 3;

const state = {
    currentPage: 1,
    activeCategory: null,
    searchTerm: '',
};

const postList = document.getElementById('post-list');
const paginationEl = document.getElementById('pagination');
const categoryList = document.getElementById('category-list');
const recentPostsList = document.getElementById('recent-posts');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('blog-search');

function getFilteredPosts() {
    return posts.filter(post => {
        const matchesCategory = !state.activeCategory || post.category === state.activeCategory;
        const matchesSearch = !state.searchTerm ||
            post.title.toLowerCase().includes(state.searchTerm) ||
            post.excerpt.toLowerCase().includes(state.searchTerm);
        return matchesCategory && matchesSearch;
    });
}

function render() {
    const filtered = getFilteredPosts();
    const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));

    if (state.currentPage > totalPages) {
        state.currentPage = 1;
    }

    const start = (state.currentPage - 1) * POSTS_PER_PAGE;
    const pagePosts = filtered.slice(start, start + POSTS_PER_PAGE);

    postList.innerHTML = '';
    if (pagePosts.length === 0) {
        postList.innerHTML = `<li class="text-gray-500">No posts match your search.</li>`;
    } else {
        pagePosts.forEach(post => postList.appendChild(renderBlogPostCard(post)));
    }

    paginationEl.innerHTML = renderPagination(state.currentPage, totalPages);

    categoryList.innerHTML = renderCategories(posts, state.activeCategory);
    recentPostsList.innerHTML = renderRecentPosts(posts);
}

function wireEvents() {
    paginationEl.addEventListener('click', (e) => {
        const btn = e.target.closest('.page-btn');
        if (!btn || btn.disabled) return;
        state.currentPage = Number(btn.dataset.page);
        render();
    });

    categoryList.addEventListener('click', (e) => {
        const btn = e.target.closest('.category-btn');
        if (!btn) return;
        const category = btn.dataset.category;
        state.activeCategory = state.activeCategory === category ? null : category;
        render();
    });

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        state.searchTerm = searchInput.value.trim().toLowerCase();
        state.currentPage = 1;
        render();
    });
}

function init() {
    render();
    wireEvents();
}

init();