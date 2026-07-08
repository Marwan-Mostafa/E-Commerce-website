import { INSPIRATION_CAROUSEL_ID, renderInspirationSlider } from '../../components/Inspiration/InspirationSlider.js';
import { renderNavbar } from '../../components/Navbar.js';
import { products } from '../../data/products.js';
import { addToCart } from '../../state/cartState.js';
import { setupFilters } from '../../state/wishlistState.js';
import { addProductToCompare } from '../../state/compareState.js';
import { copyProductLink, handleProductCardAction } from '../../handlers/productCardActions.js';
import { renderFooter } from '../../components/Footer.js';
import { renderHeroBanner } from '../../components/HeroBanner.js';
import { renderCategoryCard } from '../../components/CategoryCard.js';
import { renderInspirationSection } from '../../components/Inspiration/InspirationSection.js';
import { categories } from '../../data/categories.js';
import { initMobileMenu } from '../../modules/navbar/mobileMenu.js';
import { initCarousel } from '../../modules/carousel/carouselController.js';
import { initNewsletterForm } from '../../modules/home/newsletterForm.js';
import { renderProductGrid } from '../../components/ProductGrid.js';
import { initProductGrid } from '../../modules/product/productGridController.js';




function renderHomePage() {
  document.getElementById('navbar-root').innerHTML = renderNavbar('home');
  document.getElementById('hero-root').innerHTML = renderHeroBanner();
  document.getElementById('products-root').innerHTML = renderProductGrid();
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
initCarousel(INSPIRATION_CAROUSEL_ID);

