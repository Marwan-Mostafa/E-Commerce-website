import { products } from "./data/products.js"
import { ProductGrid } from "./components/ProductGrid.js";
import { addToCart } from "./state/cart.js";
import { toggleWishlist } from "./state/wishlist.js";
import { InspirationSection } from "./components/Inspiration/InspirationSection.js";


let visibleProducts = 4

// Render UI
const app = document.getElementById("app");
  
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
      visibleProducts = Math.min(visibleProducts + 4, products.length)
      render()
      return
    }

    const addCartBtn = e.target.closest(".add-to-cart-btn")

    if (addCartBtn) {
      const productId = Number(addCartBtn.dataset.id)
      const product = products.find(p => p.id === productId)

      if (!product) return
      addToCart(product)
      return
    }
    const wishlistBtn = e.target.closest(".wishlist-btn");

    if (wishlistBtn) {
      const productId = Number(wishlistBtn.dataset.id);
      const product = products.find((p) => p.id === productId);

      if (!product) return;
      toggleWishlist(product);
    }
  })
}

document.addEventListener("DOMContentLoaded", ()=> {
  render()
  setupEvent()

  const inspirationDiv = document.getElementById("inspiration")
  inspirationDiv.appendChild(InspirationSection())
})