const DEFAULT_PER_PAGE = 16;

const FILTER_ELEMENT_IDS = {
    filterBtn: "filterBtn",
    showItems: "showItems",
    sortItems: "sortItems",
    gridView: "gridView",
    listView: "listView",
};

export function setupFilters({
    onFilterToggle,
    onPerPageChange,
    onSortChange,
    onViewChange,
} = {}) {

    bindFilterToggle(
        FILTER_ELEMENT_IDS.filterBtn,
        onFilterToggle
    );

    bindShowItems(
        FILTER_ELEMENT_IDS.showItems,
        onPerPageChange
    );

    bindSortItems(
        FILTER_ELEMENT_IDS.sortItems,
        onSortChange
    );

    bindViewMode(
        FILTER_ELEMENT_IDS.gridView,
        "grid",
        onViewChange
    );

    bindViewMode(
        FILTER_ELEMENT_IDS.listView,
        "list",
        onViewChange
    );
}


function bindFilterToggle(id, callback) {

    const button = document.getElementById(id);

    if (!button || isAlreadyBound(button)) return;

    button.addEventListener("click", () => {

        const isOpen =
            button.getAttribute("aria-expanded") === "true";

        button.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        callback?.(!isOpen);

    });

    markBound(button);

}


function bindShowItems(id, callback) {

    const select = document.getElementById(id);

    if (!select || isAlreadyBound(select)) return;

    select.addEventListener("change", (event) => {

        const value = event.target.value;

        callback?.(
            value === "All"
                ? "All"
                : Number(value) || DEFAULT_PER_PAGE
        );

    });

    markBound(select);

}

function bindSortItems(id, callback) {

    const select = document.getElementById(id);

    if (!select || isAlreadyBound(select)) return;

    select.addEventListener("change", (event) => {

        callback?.(
            event.target.value.toLowerCase()
        );

    });

    markBound(select);

}

function bindViewMode(id, mode, callback) {

    const button = document.getElementById(id);

    if (!button || isAlreadyBound(button)) return;

    button.addEventListener("click", () => {

        callback?.(mode);

        updateActiveView(mode);

    });

    markBound(button);

}


function updateActiveView(mode) {

    const gridView =
        document.getElementById(FILTER_ELEMENT_IDS.gridView);

    const listView =
        document.getElementById(FILTER_ELEMENT_IDS.listView);

    if (gridView) {
        gridView.classList.toggle(
            "text-(--primary)",
            mode === "grid"
        );
    }

    if (listView) {
        listView.classList.toggle(
            "text-(--primary)",
            mode === "list"
        );
    }

}


function isAlreadyBound(element) {

    return (
        element.dataset.filtersBound === "true"
    );

}

function markBound(element) {

    element.dataset.filtersBound = "true";

}