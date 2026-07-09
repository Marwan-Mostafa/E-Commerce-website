import { renderNavbar } from '../../components/Navbar.js';
import { renderHeroBanner } from '../../components/HeroBanner.js';
import { renderCategoryCard } from '../../components/CategoryCard.js';
import { renderInspirationSection } from '../../components/Inspiration/InspirationSection.js';
import { renderFooter } from '../../components/Footer.js';
import { renderHomeProducts } from '../../components/HomeProductsSection.js';

import { categories } from '../../data/categories.js';
import { products } from '../../data/products.js';

import { initMobileMenu } from '../../modules/navbar/mobileMenu.js';
import { initCarousel } from '../../modules/carousel/carouselController.js';
import { initNewsletterForm } from '../../modules/home/newsletterForm.js';
import { initProductGrid } from '../../modules/product/productGridController.js';

import { INSPIRATION_CAROUSEL_ID } from '../../components/Inspiration/InspirationSlider.js';




function renderHomePage() {
  document.getElementById('navbar-root').innerHTML = renderNavbar('home');
  document.getElementById('hero-root').innerHTML = renderHeroBanner();
  document.getElementById('products-root').innerHTML = renderHomeProducts({ products, title: "Featured Products", limit: 8 });
  document.getElementById('categories-root').innerHTML = categories
    .map(renderCategoryCard)
    .join('');
  document.getElementById('inspiration-root').innerHTML = renderInspirationSection();
  document.getElementById('footer-root').innerHTML = renderFooter();
}

function initHomePage() {
  initMobileMenu();
  initCarousel(INSPIRATION_CAROUSEL_ID);
  initProductGrid();
  initNewsletterForm();
}

renderHomePage();
initHomePage();

