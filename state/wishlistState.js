import { state } from '../state/shopState.js';

const DEFAULT_PER_PAGE = 16;

const FILTER_ELEMENT_IDS = {
    filterBtn: 'filterBtn',
    showItems: 'showItems',
    sortItems: 'sortItems',
    gridView: 'gridView',
    listView: 'listView',
};

export function setupFilters(renderShop, products) {
    bindFilterToggle(FILTER_ELEMENT_IDS.filterBtn);
    bindShowItems(FILTER_ELEMENT_IDS.showItems, renderShop, products.length);
    bindSortItems(FILTER_ELEMENT_IDS.sortItems, renderShop);
    bindViewMode(FILTER_ELEMENT_IDS.gridView, 'grid', renderShop);
    bindViewMode(FILTER_ELEMENT_IDS.listView, 'list', renderShop);
}

function applyStateChange(patch, renderShop) {
    Object.assign(state, patch);
    renderShop();
}

function isAlreadyBound(element) {
    return element.dataset.filtersBound === 'true';
}

function markBound(element) {
    element.dataset.filtersBound = 'true';
}

function bindFilterToggle(id) {
    const filterBtn = document.getElementById(id);
    if (!filterBtn || isAlreadyBound(filterBtn)) return;

    filterBtn.addEventListener('click', () => {
        const isOpen = filterBtn.getAttribute('aria-expanded') === 'true';
        filterBtn.setAttribute('aria-expanded', String(!isOpen));

        window.dispatchEvent(
            new CustomEvent('shop:filter-toggle', { detail: { open: !isOpen } })
        );
    });

    markBound(filterBtn);
}

function bindShowItems(id, renderShop, totalProducts) {
    const showItems = document.getElementById(id);
    if (!showItems || isAlreadyBound(showItems)) return;

    showItems.addEventListener('change', (event) => {
        const perPage = resolvePerPage(event.target.value, totalProducts);
        applyStateChange({ perPage, currentPage: 1 }, renderShop);
    });

    markBound(showItems);
}

function resolvePerPage(rawValue, totalProducts) {
    if (rawValue === 'All') return totalProducts;

    const parsed = Number(rawValue);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_PER_PAGE;
}

function bindSortItems(id, renderShop) {
    const sortItems = document.getElementById(id);
    if (!sortItems || isAlreadyBound(sortItems)) return;

    sortItems.addEventListener('change', (event) => {
        applyStateChange({ sortBy: event.target.value.toLowerCase() }, renderShop);
    });

    markBound(sortItems);
}

function bindViewMode(id, viewMode, renderShop) {
    const button = document.getElementById(id);
    if (!button || isAlreadyBound(button)) return;

    button.addEventListener('click', () => {
        applyStateChange({ viewMode }, renderShop);
    });

    markBound(button);
}