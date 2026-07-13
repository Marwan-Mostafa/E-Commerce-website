import { renderNavbar } from "../../components/Navbar.js";
import { renderFooter } from "../../components/Footer.js";
import { renderFeaturesSection } from "../../components/FeaturesSection.js";
import { setupWishlistBadge } from "../../modules/navbar/wishlistBadge.js";
import { createShopController } from "./shopController.js";

document.getElementById("navbar-root").innerHTML = renderNavbar("shop");

document.getElementById("featuresSection").innerHTML = renderFeaturesSection();

document.getElementById("footer-root").innerHTML = renderFooter();

const controller = createShopController(document.getElementById("shopContainer"));

controller.init();