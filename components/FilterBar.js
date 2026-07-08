import { state } from "../state/shopState.js"

export function setupFilters(renderShop, products) {
    const elements = {
        filterBtn: document.getElementById("filterBtn"),
        showItems: document.getElementById("showItems"),
        sortItems: document.getElementById("sortItems"),
        gridView: document.getElementById("gridView"),
        listView: document.getElementById("listView"),
    }

    const {
        filterBtn,
        showItems,
        sortItems,
        gridView,
        listView,
    } = elements

    const requiredElements = [
        filterBtn,
        showItems,
        sortItems,
        gridView,
        listView,
    ]

    if (requiredElements.some(element => !element)) {
        console.warn("FilterBar: Missing required DOM elements.");
        return
    }
    const rerenderShop = (resetPage = false) => {
        if (resetPage) {
            state.currentPage = 1;
        }

        renderShop();
    };

    const setViewMode = (mode) => {
        if (state.viewMode === mode) return;

        state.viewMode = mode;
        rerenderShop();
    };

    const updateItemsPerPage = (value) => {
        state.perPage =
            value === "All"
                ? products.length
                : Number(value);

        rerenderShop(true);
    };

    const updateSorting = (value) => {
        state.sortBy = value.toLowerCase();
        rerenderShop();
    }


    filterBtn.addEventListener("click", () => { });

    showItems.addEventListener("change", ({ target }) => {
        updateItemsPerPage(target.value);
    })

    sortItems.addEventListener("change", (target) => {
        updateItemsPerPage(target.value);
    });

    gridView.addEventListener("click", () => {
        state.viewMode = "grid"
    });

    listView.addEventListener("click", () => {
        setViewMode("list")
    });
}