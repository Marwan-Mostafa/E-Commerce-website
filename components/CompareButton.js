import {
  addCompareId,
  isCompared,
} from "../state/compareState.js";

export function renderCompareButton(product) {

  const button =
    document.getElementById("compare-btn");

  if (!button || !product) return;

  updateButton(button, product.id);

  button.addEventListener("click", () => {

    const result = addCompareId(product.id);

    switch (result.status) {

      case "added":

      case "ready":

      case "exists":

      case "full":

        window.location.href =
          "../comparison/comparison.html";

        break;

      case "invalid":

        console.warn("Invalid product id.");

        break;

      default:

        console.warn("Unknown compare status:", result);

    }

  });

}

function updateButton(button, productId) {

  const compared = isCompared(productId);

  button.textContent =
    compared
      ? "Compared"
      : "+ Compare";

  button.classList.toggle(
    "bg-white",
    compared
  );

  button.classList.toggle(
    "text-black",
    compared
  );

  button.classList.toggle(
    "border-yellow-700",
    compared
  );

  button.classList.toggle(
    "border-gray-300",
    !compared
  );

}