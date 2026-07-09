const BASE_BUTTON_CLASS =
    "page-btn rounded-lg font-medium transition-colors";

const ACTIVE_BUTTON_CLASS =
    "w-14 h-14 bg-gray-200 text-black";

const DEFAULT_BUTTON_CLASS =
    "w-14 h-14 bg-[#F9F1E7] text-dark hover:bg-gray-300 hover:text-gold cursor-pointer";

const NEXT_BUTTON_CLASS =
    "px-8 h-14 bg-[#F9F1E7] text-dark hover:bg-gray-300 hover:text-gold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#F9F1E7] disabled:hover:text-dark";

function getPageButtonClasses(isActive) {
    return `
        ${BASE_BUTTON_CLASS}
        ${isActive ? ACTIVE_BUTTON_CLASS : DEFAULT_BUTTON_CLASS}
    `;
}

function renderPageButton(page, currentPage) {
    const isActive = page === currentPage;

    return `
        <li>
            <button
                type="button"
                class="${getPageButtonClasses(isActive)}"
                data-page="${page}"
                aria-label="Go to page ${page}"
                ${isActive ? 'aria-current="page"' : ""}
            >
                ${page}
            </button>
        </li>
    `;
}

export function renderPagination(currentPage, totalPages) {
    if (totalPages <= 1) return ""

    const paginationButtons = []

    for (let page = 1; page <= totalPages; page++) {
        paginationButtons.push(
            renderPageButton(page, currentPage)
        );
    }

    const isLastPage = currentPage >= totalPages

    paginationButtons.push(`<li>
            <button type="button" class="${BASE_BUTTON_CLASS} ${NEXT_BUTTON_CLASS}"
                data-page="${currentPage + 1}"
                aria-label="Go to next page"
                ${isLastPage ? "disabled" : ""}>
                Next
            </button>
        </li> `)

    return `
        <nav class="mt-10" aria-label="Pagination">
            <ul class="flex items-center justify-center gap-4">
                ${paginationButtons.join("")}
            </ul>
        </nav>
    `
}