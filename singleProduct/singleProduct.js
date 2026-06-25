import { products } from "../data/products.js"
import { ProductGrid } from "../components/ProductGrid.js";
import { addToCart } from "../state/cart.js";
import { toggleWishlist } from "../state/wishlist.js";
import { setupGallery } from "./modules/gallery.js";
import { setupSizeSelector } from "./modules/sizeSelector.js";
import { setupColorSelector } from "./modules/colorSelector.js";
import { setupQuantity } from "./modules/quantity.js";
import { setupAddToCart } from "./modules/addToCartHandler.js";
import { formatPrice } from "../utils/formatPrice.js";

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));
const product = products.find(p => p.id === productId);
console.log(product);

renderProduct(product);


setupGallery();
setupSizeSelector();
setupColorSelector();
setupQuantity();
setupAddToCart(product);

let visibleProducts = 4

// Render UI
const app = document.getElementById("app");

function render() {
  app.innerHTML = `
    <section class="w-full flex justify-center py-16 px-4">
      <div class="w-full max-w-6xl">

        <h2 class="text-center text-3xl font-bold mb-10">
          Related Products
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
      window.location.href = "../../pages/shop.html"
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

render()
setupEvent()


// Switch Tabs Part

const tabsContainer = document.querySelector(".flex.gap-10.mb-8");

const tabs = document.querySelectorAll(".tab-btn");

const contents = document.querySelectorAll(".tab-content");

tabsContainer.addEventListener("click", (e) => {
  const button = e.target.closest(".tab-btn");

  if (!button) return;

  const targetTab = button.dataset.tab;

  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  button.classList.add("active");

  contents.forEach((content) => {
    content.classList.add("hidden");
  });

  document.getElementById(`tab-${targetTab}`).classList.remove("hidden");
});


if (!product) {
  window.location.href = "./shop.html"

  throw new Error("Product Not Found")
}

function renderProduct(product) {

  document.getElementById("breadcrumb-product-name").textContent = product.name;

  document.getElementById("product-name").textContent = product.name;

  document.getElementById("product-price").textContent = formatPrice(product.price);

  document.getElementById("product-category").textContent = product.category;

  document.getElementById("meta-sku").textContent = `SKU-${product.id}`

  document.getElementById("product-tags").textContent = product.category;
  
  document.getElementById("main-image").src = product.image;
}



const thumbnails = document.getElementById("thumbnails");

thumbnails.innerHTML = `
  <div class="thumb active" data-image="${product.image}">
    <img src="${product.image}" class="w-full h-16 object-cover" alt="${product.name}" />
  </div>
`;

