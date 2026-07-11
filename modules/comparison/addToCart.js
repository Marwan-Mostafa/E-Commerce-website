import { products } from "../../data/products.js";
import { addToCart } from "../../state/cartState.js";

export function setupComparisonAddToCart() {

    const buttons = document.querySelectorAll(
        ".comparison-add-to-cart-btn"
    );

    buttons.forEach((button) => {

        button.addEventListener("click", () => {

            const productId = Number(button.dataset.productId);

            const product = products.find(
                (item) => item.id === productId
            );

            if (!product) return;

            addToCart({
                ...product,
                quantity: 1,
            });

            window.location.href = "../cart/cart.html";

        });

    });

}