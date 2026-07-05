import { state } from "../state/shopState.js"

export function setupFilters(renderShop, products) {
    const filterBtn = document.getElementById("filterBtn");
    const showItems = document.getElementById("showItems");
    const sortItems = document.getElementById("sortItems");
    const gridView = document.getElementById("gridView");
    const listView = document.getElementById("listView");


    filterBtn.addEventListener("click", () => {
        console.log("Open filter panel");
    });

    showItems.addEventListener("change", (e) => {
        const value = e.target.value;

        state.perPage =
            value === "All" ? products.length : Number(value);

        state.currentPage = 1;

        renderShop();
    });

    sortItems.addEventListener("change", (e) => {
        state.sortBy = e.target.value.toLowerCase();

        renderShop();
    });

    gridView.addEventListener("click", () => {
        state.viewMode = "grid";
        renderShop();
    });

    listView.addEventListener("click", () => {
        state.viewMode = "list";
        renderShop();
    });
}