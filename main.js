import { products } from "./components/data/products.js";
import { ProductGrid } from "./components/ProductGrid.js";
import { addToCart } from "./state/cart.js";
import { toggleWishlist } from "./state/wishlist.js";

const app = document.getElementById("app");
let visibleProducts = 4

// Render UI
function render() {
    app.innerHTML = `
    <section class="w-full flex justify-center py-16 px-4">
      <div class="w-full max-w-6xl">

        <h2 class="text-center text-3xl font-bold mb-10">
          Our Products
        </h2>

        ${ProductGrid(products.slice(0, visibleProducts))}

        <div class="flex justify-center mt-10">
          
        <button id="show-more-btn" class="border border-yellow-700 text-yellow-700 px-10 py-3 
          font-semibold hover:bg-yellow-700 hover:text-white transition duration-300 cursor-pointer">
            Show more    
        
        </button>
        
        </div>

      </div>
    </section>
  `;
}

function setupEvent(){
  const showMoreBtn = document.getElementById("show-more-btn")
  
  if (!showMoreBtn) return

  showMoreBtn.addEventListener("click", ()=>{
    visibleProducts += 4

    render()
    setupEvent()
  })
}

render();
setupEvent();

window.addToCartHandler = (id) => {
    const product = products.find(p => p.id === id);
    addToCart(product);
};

window.wishlistHandler = (id) => {
    const product = products.find(p => p.id === id);
    toggleWishlist(product);
};

