import { products } from "../../data/products.js";

import { renderNavbar } from "../../components/Navbar.js";
import { renderFooter } from "../../components/Footer.js";
import { renderFeaturesSection } from "../../components/FeaturesSection.js";

import { ComparisonSection } from "../../components/comparison/ComparisonSection.js";
import { ComparisonTable } from "../../components/comparison/ComparisonTable.js";

import { getCompareIds } from "../../state/compareState.js";

import { setupComparisonSelector } from "../../modules/comparison/selector.js";


const navbarRoot = document.getElementById("navbar-root");
const footerRoot = document.getElementById("footer-root");
const featuresRoot = document.getElementById("featuresSection");

const comparisonSectionRoot =
    document.getElementById("comparison-section");

const comparisonTableRoot =
    document.getElementById("comparison-table");


function renderLayout() {
    navbarRoot.innerHTML = renderNavbar("shop");

    footerRoot.innerHTML = renderFooter();

    featuresRoot.innerHTML = renderFeaturesSection();
}


function loadComparedProducts() {
    const compareIds = getCompareIds();

    return compareIds
        .map((id) => products.find((product) => product.id === id))
        .filter(Boolean);
}


function renderEmptyState() {
    comparisonSectionRoot.innerHTML = `
    <section class="py-24 text-center">

      <h2 class="text-3xl font-semibold">
        No products selected
      </h2>

      <p class="mt-3 text-[#9F9F9F]">
        Add products from the Shop page to compare them.
      </p>

    </section>
  `;

    comparisonTableRoot.innerHTML = "";
}


function renderPage() {
    const comparedProducts = loadComparedProducts();
    
    if (!comparedProducts.length) {
        renderEmptyState();
        return;
    }

    comparisonSectionRoot.innerHTML =
        ComparisonSection(comparedProducts);

    comparisonTableRoot.innerHTML =
        ComparisonTable(comparedProducts);

    setupComparisonSelector({
        products,
        rerender: renderPage,
    });
}


function bootstrap() {
    renderLayout();

    renderPage();
}

bootstrap();