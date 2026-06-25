import { productState } from "../state/productState.js"

export function setupColorSelector() {
  const colors = document.querySelectorAll(".color-swatch")

  colors.forEach((color) => {
    color.addEventListener("click", () => {
      productState.selectedColor = color.dataset.color

      colors.forEach((item) => {
        item.classList.remove("active")
      })

      color.classList.add("active")

      console.log("Selected Color:", productState.selectedColor);
    })
  })
}
