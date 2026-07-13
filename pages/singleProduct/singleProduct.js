import { products } from "../../data/products.js";

import { renderNavbar } from "../../components/Navbar.js";
import { renderFooter } from "../../components/Footer.js";
import { ProductBreadcrumb } from "../../components/ProductBreadcrumb.js";
import { ProductDetails } from "../../components/ProductDetails.js";
import { ProductTabs } from "../../components/ProductTabs.js";
import { RelatedProducts } from "../../components/RelatedProductsSection.js";
import { CartDrawer } from "../../components/CartDrawer.js";
import { renderCompareButton } from "../../components/CompareButton.js";
import { setupWishlistBadge } from "../../modules/navbar/wishlistBadge.js";
import { setupGallery } from "../../modules/product/gallery.js";
import { setupSizeSelector } from "../../modules/product/sizeSelector.js";
import { setupColorSelector } from "../../modules/product/colorSelector.js";
import { setupQuantity } from "../../modules/product/quantity.js";
import { setupAddToCart } from "../../modules/product/addToCartHandler.js";
import { setupTabs } from "../../modules/product/tabs.js";

import {
  setupCartDrawer,
  openCartDrawer,
  renderCartDrawer,
} from "../../modules/cartDrawer.js";

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id")) || 1;
const product = products.find((p) => p.id === productId);

if (!product) {
  window.location.href = "../shop/shop.html";
  throw new Error("Product not found");
}


document.getElementById("navbar-root").innerHTML =
  renderNavbar("shop");

document.getElementById("breadcrumb-root").innerHTML =
  ProductBreadcrumb(product);

document.getElementById("product-root").innerHTML =
  ProductDetails(product);

document.getElementById("product-tabs-root").innerHTML =
  ProductTabs(product);

document.getElementById("related-products-root").innerHTML =
  RelatedProducts(product, products);

document.getElementById("cart-drawer-root").innerHTML =
  CartDrawer();

document.getElementById("footer-root").innerHTML =
  renderFooter();


setupGallery(product);

setupSizeSelector();

setupColorSelector();

setupQuantity();

setupAddToCart(product);

renderCompareButton(product);

setupTabs();

setupCartDrawer();
setupWishlistBadge();

const cartTrigger = document.getElementById("cart-trigger");

cartTrigger?.addEventListener("click", () => {
  renderCartDrawer();
  openCartDrawer();
});

const showMoreBtn = document.getElementById("show-more-btn");

showMoreBtn?.addEventListener("click", () => {
  window.location.href = "../shop/shop.html";
});