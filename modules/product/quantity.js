import { productState } from "../../state/productState.js";

export function setupQuantity() {
    const qtyInput = document.getElementById("qty-input")
    const decreaseBtn = document.getElementById("decrease-qty")
    const increaseBtn = document.getElementById("increase-qty")

    increaseBtn.addEventListener("click", () => {
        productState.quantity++;

        qtyInput.value = productState.quantity
    })

    decreaseBtn.addEventListener("click", () => {

        if (productState.quantity <= 1) return
        productState.quantity--;

        qtyInput.value = productState.quantity
    })
}