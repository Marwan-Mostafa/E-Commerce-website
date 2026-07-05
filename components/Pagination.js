export function renderPagination(currentPage, totalPages) {
    if (totalPages <= 1) return ''

    let buttons = ''

    for (let page = 1; page <= totalPages; page++) {
        const isActive = currentPage === page
        buttons += `
            <li>
                <button type="button" data-page="${page}"
                    ${isActive ? 'aria-current="page"' : ''}
                    class="page-btn w-14 h-14 rounded-lg font-medium transition-colors
                        ${isActive
                ? 'bg-gray-200 text-black'
                : 'bg-[#F9F1E7] text-dark hover:bg-gray-300 hover:text-gold cursor-pointer'}">
                    ${page}
                </button>
            </li>`
    }

    const isLastPage = currentPage === totalPages

    buttons += `
        <li>
            <button type="button" data-page="${currentPage + 1}" ${isLastPage ? 'disabled' : ''}
                class="page-btn px-8 h-14 rounded-lg font-medium transition-colors
                    bg-[#F9F1E7] text-dark hover:bg-gray-300 hover:text-gold
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#F9F1E7] disabled:hover:text-dark">
                Next
            </button>
        </li>`

    return `
        <nav aria-label="Pagination" class="mt-10">
            <ul class="flex items-center justify-center gap-4">${buttons}</ul>
        </nav>`
}