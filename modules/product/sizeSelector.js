import { productState } from "../../singleProduct/state/productState.js"

export function setupSizeSelector() {
    const buttons = document.querySelectorAll(".size-btn")

    buttons.forEach((button) => {
        button.addEventListener("click", () => {

            productState.selectedSize = button.dataset.size

            buttons.forEach((btn) => {
                btn.classList.remove("active")
            })

            button.classList.add("active")
        })
    })
}