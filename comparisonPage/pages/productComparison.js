import { products } from '../../data/products.js';
import { getCompareIds, addCompareId, removeCompareId } from '../../state/compareState.js';
import { ComparisonCard } from '../components/ComparisonCard.js';
import { ComparisonTable } from '../components/ComparisonTable.js';
import { ProductSelector, initProductSelector } from '../components/ProductSelector.js';



const findProductsByIds = (ids) => {
    return ids
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean)
}


const getCardsContainer = () => document.getElementById('comparison-cards');
const getSelectorContainer = () => document.getElementById('comparison-selector');
const getTableContainer = () => document.getElementById('comparison-table');


const renderPromoColumn = () => {
    const container = document.getElementById('comparison-promo');
    if (!container) return

    container.innerHTML = `
    <div class="flex flex-col gap-3 max-w-[280px]">
      <p class="font-semibold text-[30px] text-gray-900 leading-snug">
        Go to Product page for more Products
      </p>
      
        <a href="/pages/shop.html"
        class="
          inline-block
          text-lg font-medium
          text-gray-700
          underline
          underline-offset-4
          hover:text-[#B88E2F]
          transition-colors duration-200
        ">
        View More
      </a>
    </div>`
}

const renderCards = (compareProducts) => {
    const container = getCardsContainer()
    if (!container) return

    const cardsHTML = compareProducts
        .map((product) => ComparisonCard(product))
        .join('')

    container.innerHTML = cardsHTML
}


const renderSelector = (compareProducts) => {
    const container = getSelectorContainer();
    if (!container) return

    const compareIds = getCompareIds();

    if (compareProducts.length >= 2) {
        container.innerHTML = ''
        container.style.display = 'none'
        return
    }
    container.style.display = ''

    container.innerHTML = ProductSelector({
        allProducts: products,
        compareIds,
    })

    initProductSelector((selectedId) => {
        const added = addCompareId(selectedId)
        if (added) {
            renderAll()
        }
    })
}



const renderTable = (compareProducts) => {
    const container = getTableContainer()
    if (!container) return
    if (compareProducts.length === 0) {
        container.innerHTML = `
      <div class="text-center py-20 text-gray-400 text-sm">
        Add products to compare them.
      </div>
    `
        return
    }

    container.innerHTML = ComparisonTable({ products: compareProducts })

    attachCartListeners(compareProducts)
}


const attachCartListeners = (compareProducts) => {
    const container = getTableContainer()
    if (!container) return

    container.addEventListener('click', (e) => {
        const button = e.target.closest('.add-to-cart-btn')
        if (!button) return

        const productId = +button.dataset.productId
        const product = compareProducts.find((p) => p.id === productId)
        if (!product) return


        button.textContent = 'Added!'
        button.classList.add('bg-green-600')
        button.classList.remove('bg-[#B88E2F]', 'hover:bg-[#a07828]')
        button.disabled = true;

        setTimeout(() => {
            button.textContent = 'Add To Cart'
            button.classList.remove('bg-green-600')
            button.classList.add('bg-[#B88E2F]', 'hover:bg-[#a07828]')
            button.disabled = false
        }, 2000)
    })
}


let removeListenerAttached = false

const attachRemoveListeners = () => {
    if (removeListenerAttached) return

    const container = getCardsContainer()
    if (!container) return

    container.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-product-btn')
        if (!removeBtn) return

        const productId = +removeBtn.dataset.productId
        removeCompareId(productId)

        renderAll()
    });

    removeListenerAttached = true
}


const renderAll = () => {
    const compareIds = getCompareIds()
    const compareProducts = findProductsByIds(compareIds)

    renderPromoColumn()
    renderCards(compareProducts)
    renderSelector(compareProducts)
    renderTable(compareProducts)
    attachRemoveListeners()
}


const init = () => {
    renderAll()
}

document.addEventListener('DOMContentLoaded', init)