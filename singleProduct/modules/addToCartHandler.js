import { productState } from "../state/productState.js";
import { addToCart } from "../../state/cart.js";
import { products } from "../../data/products.js";

export function setupAddToCart(products) {

    const addToCartBtn = document.getElementById("add-to-cart-btn")
    addToCartBtn.addEventListener("click", () => {

        const cartItem = {
            ...products,
            image: productState.selectedImage,
            size: productState.selectedSize,
            color: productState.selectedColor,
            quantity: productState.quantity,
        };

        addToCart(cartItem);
        console.log(cartItem);
    }
    );
}