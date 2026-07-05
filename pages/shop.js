import { paginate, getTotalPages } from "../utils/paginate.js"
import { products } from "../data/products.js"
import { state } from "../state/shopState.js"
import { sortProducts } from "../utils/sortProducts.js";
import { setupFilters } from "../components/FilterBar.js";
import { ProductGrid } from "../components/ProductGrid.js"
import { renderPagination } from "../components/Pagination.js"

const shopContainer = document.getElementById("shopContainer")

function renderShop() {
    const sortedProducts = sortProducts(products, state.sortBy);

    const paginatedProducts = paginate(sortedProducts, state.currentPage, state.perPage)
    const totalPages = getTotalPages(sortedProducts, state.perPage)

    shopContainer.innerHTML = `
    ${ProductGrid(paginatedProducts, state.viewMode)}
    ${renderPagination(state.currentPage, totalPages)}
    `
}


shopContainer.addEventListener("click", (e) => {
    const pageBtn = e.target.closest(".page-btn");
    if (pageBtn && !pageBtn.disabled) {
        state.currentPage = Number(pageBtn.dataset.page);
        renderShop();
        return;
    }

    const addToCartBtn = e.target.closest(".add-to-cart-btn");
    if (addToCartBtn) {
        e.stopPropagation()
        const card = addToCartBtn.closest(".product-card");
        const productId = Number(card.dataset.id);
        window.location.href = `../singleProduct/singleProduct.html?id=${productId}`;
        return;
    }

    const productCard = e.target.closest(".product-card");
    if (productCard) {
        const productId = Number(productCard.dataset.id);
        window.location.href = `../singleProduct/singleProduct.html?id=${productId}`;
    }
});

setupFilters(renderShop, products)
renderShop()