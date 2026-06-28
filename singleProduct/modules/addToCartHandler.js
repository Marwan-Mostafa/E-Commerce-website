import { productState } from "../state/productState.js";
import { addToCart } from "../../state/cart.js";
import { products } from "../../data/products.js";
import { openCartDrawer } from "../../components/cartDrawer.js";
import { renderCartDrawer } from "../../components/cartDrawer.js";


export function setupAddToCart(product) {
console.log("Handler Product:", product);
    const addToCartBtn = document.getElementById("add-to-cart-btn")
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
        console.log(cartItem);
        addToCart(cartItem);
        renderCartDrawer();
        openCartDrawer();
        console.log("Added");
        console.log("Added: ", cartItem);
    }
    );
}