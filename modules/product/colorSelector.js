import { productState } from "../../state/productState.js";

const ACTIVE_CLASSES = [
  "ring-2",
  "ring-[#B88E2F]",
  "ring-offset-2",
  "scale-110",
];

export function setupColorSelector() {

  const colors = document.querySelectorAll(".color-swatch");

  if (!colors.length) return;

  productState.selectedColor = colors[0].dataset.color;
  colors[0].setAttribute("aria-pressed", "true");

  colors.forEach((color) => {

    color.addEventListener("click", () => {

      productState.selectedColor = color.dataset.color;

      colors.forEach((item) => {

        item.classList.remove(...ACTIVE_CLASSES);

        item.setAttribute("aria-pressed", "false");

      });

      color.classList.add(...ACTIVE_CLASSES);

      color.setAttribute("aria-pressed", "true");

    });

  });

}