import { productState } from "../../state/productState.js";
import { addToCart } from "../../state/cartState.js";
import { openCartDrawer } from "../../modules/cartDrawer.js";
import { renderCartDrawer } from "../../modules/cartDrawer.js";


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