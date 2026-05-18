import { products } from "./components/data/products.js";
import { ProductGrid } from "./components/ProductGrid.js";
import { addToCart } from "./state/cart.js";
import { toggleWishlist } from "./state/wishlist.js";

const app = document.getElementById("app");

// Render UI
function render() {
    app.innerHTML = `
    <section class="w-full flex justify-center py-16 px-4">
      <div class="w-full max-w-6xl">

        <h2 class="text-center text-3xl font-bold mb-10">
          Our Products
        </h2>

        ${ProductGrid(products)}

      </div>
    </section>
  `;
}

render();

window.addToCartHandler = (id) => {
    const product = products.find(p => p.id === id);
    addToCart(product);
};

window.wishlistHandler = (id) => {
    const product = products.find(p => p.id === id);
    toggleWishlist(product);
};

