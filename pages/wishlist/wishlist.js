import { renderNavbar } from "../../components/Navbar.js";
import { renderFooter } from "../../components/Footer.js";
import { renderFeaturesSection } from "../../components/FeaturesSection.js";
import { WishlistLayout } from "../../components/wishlist/WishlistLayout.js";
import { setupWishlistBadge } from "../../modules/navbar/wishlistBadge.js";
import {
    setupFilters,
} from "../../components/FilterBar.js";

const ROOTS = {

    navbar: document.getElementById("navbar-root"),

    wishlist: document.getElementById("wishlist-root"),

    features: document.getElementById("features-root"),

    footer: document.getElementById("footer-root"),

};

function renderLayout() {

    ROOTS.navbar.innerHTML =
        renderNavbar("wishlist");

    ROOTS.features.innerHTML =
        renderFeaturesSection();

    ROOTS.footer.innerHTML =
        renderFooter();

}

function renderWishlist() {

    const products = setupFilters();

    ROOTS.wishlist.innerHTML =
        WishlistLayout({

            products,

        });

}

function bindEvents() {

    document.addEventListener(

        "click",

        handleClick

    );

}

function handleClick(event) {

    const productCard = event.target.closest(

        "[data-product-id]"

    );

    if (!productCard) {

        return;

    }

    const productId =

        productCard.dataset.productId;

    console.log(

        "Wishlist Product:",

        productId

    );

}

function bootstrap() {

    renderLayout()
    renderWishlist()
    bindEvents()

}

bootstrap();