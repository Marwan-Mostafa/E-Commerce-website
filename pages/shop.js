import { products } from "../data/products.js"
import { paginate, getTotalPages } from "../utils/paginate.js"
import { state } from "../state/shopState.js"
import { sortProducts } from "../utils/sortProducts.js";
import { setupFilters } from "../components/ FilterBar.js";
import { ProductGrid } from "../components/ProductGrid.js"
import { Pagination } from "../components/ Pagination.js"


const shopContainer = document.getElementById("shopContainer")

function renderShop() {
    const sortedProducts = sortProducts(products, state.sortBy);

    const paginatedProducts = paginate(sortedProducts, state.currentPage, state.perPage)
    const totalPages = getTotalPages(sortedProducts, state.perPage)

    shopContainer.innerHTML = `
    ${ProductGrid(paginatedProducts, state.viewMode)}
    ${Pagination(totalPages, state.currentPage)}
    `

    attachPaginationEvents(totalPages);
}

function attachPaginationEvents(totalPages) {
    const pageButton = document.querySelectorAll("[data-page]")
    const nextButton = document.querySelector("[data-next]")

    pageButton.forEach((button) => {
        button.addEventListener("click", () => {
            state.currentPage = Number(button.dataset.page)
            renderShop()
        })
    })

    nextButton.addEventListener("click", () => {
        if (state.currentPage < totalPages) {
            state.currentPage++
            renderShop()
        }
    })
}
setupFilters(renderShop, products)
renderShop()