function createButton({
    label,
    page,
    active = false,
    disabled = false,
}) {

    return `
        <button
            class="page-btn
                   w-12 h-12
                   rounded-lg
                   transition
                   ${active ? "bg-(--primary) text-white" : "bg-[#F9F1E7]"}
                   ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}"
            data-page="${page}"
            ${disabled ? "disabled" : ""}
        >
            ${label}
        </button>
    `;
}

export function renderPagination(currentPage, totalPages) {

    if (totalPages <= 1) return "";

    let html = `
        <nav
            class="flex justify-center gap-4 mt-12"
            aria-label="Pagination">
    `;

    html += createButton({
        label: "Prev",
        page: currentPage - 1,
        disabled: currentPage === 1,
    });

    for (let page = 1; page <= totalPages; page++) {

        html += createButton({
            label: page,
            page,
            active: page === currentPage,
        });

    }

    html += createButton({
        label: "Next",
        page: currentPage + 1,
        disabled: currentPage === totalPages,
    });

    html += "</nav>";

    return html;
}