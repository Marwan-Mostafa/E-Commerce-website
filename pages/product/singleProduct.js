import { products } from "../../data/products.js"
import { ProductGrid } from "../../components/ProductGrid.js";
import { addToCart } from "../../state/cart.js";
import { toggleWishlist } from "../../state/wishlist.js";
import { setupGallery } from "./modules/gallery.js";
import { setupSizeSelector } from "../../modules/product/sizeSelector.js";
import { setupColorSelector } from "../../modules/product/colorSelector.js";
import { setupQuantity } from "./modules/quantity.js";
import { setupAddToCart } from "../../modules/product/addToCartHandler.js";
import { formatPrice } from "../../utils/formatPrice.js";
import { openCartDrawer, renderCartDrawer } from "../../components/CartDrawer.js";
import { renderCompareButton } from "../../components/CompareButton.js";
import { addProductToCompare } from "../../state/compareState.js";
import { copyProductLink, handleProductCardAction } from "../../utils/productCardActions.js";

const openCartBtn = document.getElementById("open-cart-btn");

openCartBtn.addEventListener("click", () => {
  renderCartDrawer();
  openCartDrawer();
});

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));
const product = products.find(p => p.id === productId);

if (!product) {
  window.location.href = "./shop.html"

  throw new Error("Product Not Found")
}

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

    const handled = handleProductCardAction(e, products, {
      onAddToCart: (product) => addToCart(product),
      onWishlist: (product) => toggleWishlist(product),
      onCompare: (product) => {
        const result = addProductToCompare(product.id)

        if (result.status === "open" || result.status === "ready") {
          window.location.href = "../comparisonPage/productComparison.html"
        }
      },
      onShare: (product) => void copyProductLink(product),
    })

    if (handled) {
      return
    }
  })
}

render()
setupEvent()


// Switch Tabs Part

const tabsContainer = document.getElementById("tabs");

const tabs = document.querySelectorAll(".tab-btn");

const contents = document.querySelectorAll(".tab-content");

if (tabsContainer) {
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


renderCompareButton(product);