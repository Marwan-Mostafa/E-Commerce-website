import { renderNavbar } from "../../components/Navbar.js";
import { renderHeroBanner } from "../../components/HeroBanner.js";
import { renderCategoryCard } from "../../components/CategoryCard.js";
import { renderHomeProducts } from "../../components/HomeProductsSection.js";
import { renderInspirationSection } from "../../components/Inspiration/InspirationSection.js";
import { renderFooter } from "../../components/Footer.js";
import { INSPIRATION_CAROUSEL_ID } from "../../components/Inspiration/InspirationSlider.js";
import { products } from "../../data/products.js";
import { categories } from "../../data/categories.js";
import { initMobileMenu } from "../../modules/navbar/mobileMenu.js";
import { setupWishlistBadge } from "../../modules/navbar/wishlistBadge.js";

import { initCarousel } from "../../modules/carousel/carouselController.js";
import { initNewsletterForm } from "../../modules/home/newsletterForm.js";
import { initProductGrid } from "../../modules/product/productGridController.js";

function setHtml(rootId, html) {
  const root = document.getElementById(rootId);

  if (!root) {
    console.warn(`[home] Missing root element: #${rootId}`);
    return;
  }

  root.innerHTML = html;
}

function safeInit(name, fn) {
  try {
    fn();
  } catch (error) {
    console.error(`[home] Failed to initialize: ${name}`, error);
  }
}

function renderHomePage() {
  setHtml("navbar-root", renderNavbar("home"));

  setHtml("hero-root", renderHeroBanner());

  setHtml(
    "products-root",
    renderHomeProducts({
      products,
      title: "Featured Products",
      limit: 8,
    })
  );

  setHtml("categories-root", categories.map(renderCategoryCard).join(""));

  setHtml("inspiration-root", renderInspirationSection());

  setHtml("footer-root", renderFooter());
}

function initHomePage() {
  safeInit("mobileMenu", initMobileMenu);

  safeInit("wishlistBadge", setupWishlistBadge);

  safeInit("carousel", () => initCarousel(INSPIRATION_CAROUSEL_ID));

  safeInit("productGrid", initProductGrid);

  safeInit("newsletterForm", initNewsletterForm);
}

renderHomePage();
initHomePage();