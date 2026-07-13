export const state = {
    currentPage: 1,
    perPage: 16,

    sortBy: "default",
    viewMode: "grid",

    search: "",
    category: "all",
};

const subscribers = new Set();


function notifySubscribers() {

    subscribers.forEach(listener => {

        listener({ ...state });

    });

}


export function setCurrentPage(page) {

    state.currentPage =

        Math.max(1, Number(page) || 1);

    notifySubscribers();

}

export function setPerPage(value) {

    state.perPage =

        value === Infinity

            ? Infinity

            : Math.max(1, Number(value) || 16);

    notifySubscribers();

}

export function setSort(sort) {

    state.sortBy =

        sort || "default";

    notifySubscribers();

}

export function setView(mode) {

    state.viewMode =

        mode === "list"

            ? "list"

            : "grid";

    notifySubscribers();

}

export function setSearch(value) {

    state.search =

        value.trim();

    notifySubscribers();

}

export function setCategory(category) {

    state.category =

        category || "all";

    notifySubscribers();

}


export function resetShopState() {

    state.currentPage = 1;

    state.perPage = 16;

    state.sortBy = "default";

    state.viewMode = "grid";

    state.search = "";

    state.category = "all";

    notifySubscribers();

}

export function subscribeShopState(listener) {

    if (typeof listener !== "function") {

        return () => { };

    }

    subscribers.add(listener);

    return () => {

        subscribers.delete(listener);

    };

}