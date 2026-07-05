import { productState } from "../../singleProduct/state/productState.js";
import { addToCart } from "../../state/cart.js";
import { openCartDrawer } from "../../components/CartDrawer.js";
import { renderCartDrawer } from "../../components/CartDrawer.js";


export function setupAddToCart(product) {
    const addToCartBtn = document.getElementById("add-to-cart-btn")
    if (!addToCartBtn) return;

    addToCartBtn.addEventListener("click", () => {
        const cartItem = {
            id: product.id,
            name: product.name,
            image: productState.selectedImage || product.image,
            price: product.price,
            quantity: productState.quantity,
            size: productState.selectedSize,
            color: productState.selectedColor
        };
        addToCart(cartItem);
        renderCartDrawer();
        openCartDrawer();
    }
    );
}