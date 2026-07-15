import { renderNavbar } from "../../components/Navbar.js";
import { renderFooter } from "../../components/Footer.js";
import { renderFeaturesSection } from "../../components/FeaturesSection.js";
import { initMobileMenu } from "../../modules/navbar/mobileMenu.js";
import { setupWishlistBadge } from "../../modules/navbar/wishlistBadge.js";
import { createShopController } from "./shopController.js";

function setHtml(rootId, html) {
    const root = document.getElementById(rootId);

    if (!root) {
        console.warn(`[shop] Missing root element: #${rootId}`);
        return;
    }

    root.innerHTML = html;
}

function renderShopPage() {
    setHtml("navbar-root", renderNavbar("shop"));
    setHtml("featuresSection", renderFeaturesSection());
    setHtml("footer-root", renderFooter());
}


function initShopPage() {
    try {
        initMobileMenu();
    } catch (error) {
        console.error("[shop] Failed to initialize mobile menu.", error);
    }

    try {
        setupWishlistBadge();
    } catch (error) {
        console.error("[shop] Failed to initialize wishlist badge.", error);
    }

    const shopContainer = document.getElementById("shopContainer");

    if (!shopContainer) {
        console.error(
            "[shop] Missing #shopContainer — shop controller was not started."
        );
        return;
    }

    const controller = createShopController(shopContainer);
    controller.init();
}

renderShopPage();
initShopPage();