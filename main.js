import { products } from "./data/products.js"
import { ProductGrid } from "./components/ProductGrid.js";
import { addToCart } from "./state/cart.js";
import { toggleWishlist } from "./state/wishlist.js";
import { addCompareId, getCount, isCompared } from "./state/compareState.js";
import { copyProductLink, getProductCardAction } from "./utils/productCardActions.js";


let visibleProducts = 4

// Render UI
const app = document.getElementById("app")

function render() {
  app.innerHTML = `
    <section class="w-full flex justify-center py-16 px-4">
      <div class="w-full max-w-6xl">

        <h2 class="text-center text-3xl font-bold mb-10">
          Our Products
        </h2>

        ${ProductGrid(products.slice(0, visibleProducts))}

        ${visibleProducts < products.length ?
      `<div class="flex justify-center mt-10">
          
        <button id="show-more-btn" class="border border-yellow-700 text-yellow-700 px-10 py-3 transition-all hover:shadow-black/20 hover:-translate-y-1 active:scale-90 
          font-semibold hover:bg-yellow-700 hover:text-white duration-300 cursor-pointer">
            Show more    
        </button>
        
        </div>`: ""}

      </div>
    </section>
  `;
}

function setupEvent() {
  app.addEventListener("click", (e) => {
    const showMoreBtn = e.target.closest("#show-more-btn")

    if (showMoreBtn) {
      window.location.href = "./pages/shop.html"
      return
    }

    const cardAction = getProductCardAction(e, products)

    if (cardAction) {
      const { action, product } = cardAction

      if (action === "add-to-cart") {
        addToCart(product)
        return
      }

      if (action === "wishlist") {
        toggleWishlist(product)
        return
      }

      if (action === "compare") {
        if (!isCompared(product.id)) {
          addCompareId(product.id)
        }

        if (getCount() >= 2) {
          window.location.href = "./comparisonPage/productComparison.html"
        }

        return
      }

      if (action === "share") {
        void copyProductLink(product)
        return
      }
    }

    const productCard = e.target.closest(".product-card");

    if (productCard) {
      const productId = Number(productCard.dataset.id)

      window.location.href = `./singleProduct/singleProduct.html?id=${productId}`
    }
  })
}

render()
setupEvent()