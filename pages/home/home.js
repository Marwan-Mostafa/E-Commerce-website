// ======================================================
// Components
// ======================================================

import { renderNavbar } from "../../components/Navbar.js";
import { renderHeroBanner } from "../../components/HeroBanner.js";
import { renderCategoryCard } from "../../components/CategoryCard.js";
import { renderHomeProducts } from "../../components/HomeProductsSection.js";
import { renderInspirationSection } from "../../components/Inspiration/InspirationSection.js";
import { renderFooter } from "../../components/Footer.js";

import { INSPIRATION_CAROUSEL_ID } from "../../components/Inspiration/InspirationSlider.js";


// ======================================================
// Data
// ======================================================

import { products } from "../../data/products.js";
import { categories } from "../../data/categories.js";


// ======================================================
// Modules
// ======================================================

import { initMobileMenu } from "../../modules/navbar/mobileMenu.js";
import { setupWishlistBadge } from "../../modules/navbar/wishlistBadge.js";

import { initCarousel } from "../../modules/carousel/carouselController.js";
import { initNewsletterForm } from "../../modules/home/newsletterForm.js";
import { initProductGrid } from "../../modules/product/productGridController.js";


// ======================================================
// Render
// ======================================================

function renderHomePage() {

  document.getElementById("navbar-root").innerHTML =
    renderNavbar("home");

  document.getElementById("hero-root").innerHTML =
    renderHeroBanner();

  document.getElementById("products-root").innerHTML =
    renderHomeProducts({

      products,

      title: "Featured Products",

      limit: 8,

    });

  document.getElementById("categories-root").innerHTML =

    categories

      .map(renderCategoryCard)

      .join("");

  document.getElementById("inspiration-root").innerHTML =

    renderInspirationSection();

  document.getElementById("footer-root").innerHTML =

    renderFooter();

}


// ======================================================
// Initialization
// ======================================================

function initHomePage() {

  initMobileMenu();

  setupWishlistBadge();

  initCarousel(

    INSPIRATION_CAROUSEL_ID

  );

  initProductGrid();

  initNewsletterForm();

}


// ======================================================
// Bootstrap
// ======================================================

renderHomePage();

initHomePage();