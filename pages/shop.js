import {products} from "../data/products.js"
import {paginate, getTotalPages} from "../utils/paginate.js"
import { ProductGrid } from "../components/ProductGrid.js"
import { Pagination } from "../components/ Pagination.js"


let currentPage = 1
const perPage = 8

const shopContainer = document.getElementById("shopContainer")

function renderShop(){
    const paginateProducts = paginate(products, currentPage, perPage)
    const totalPages = getTotalPages(products, perPage)

    shopContainer.innerHTML = `
    ${ProductGrid(paginateProducts)}
    ${Pagination(totalPages, currentPage)}
    `

    attachPaginationEvents(totalPages);
}

function attachPaginationEvents(totalPages){
    const pageButton = document.querySelectorAll("[data-page]")
    const nextButton = document.querySelector("[data-next]")

    pageButton.forEach((button) =>{
        button.addEventListener("click", ()=>{
            currentPage = Number(button.dataset.page)
            renderShop()
        })
    })

    nextButton.addEventListener("click", ()=>{
        if(currentPage < totalPages){
            currentPage++
            renderShop()
        }
    })
}

renderShop()