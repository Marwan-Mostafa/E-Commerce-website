import { isCompared, addCompareId } from "../state/compareState.js";

export function renderCompareBtn(product) {
  const button = document.getElementById("compare-btn");

  if (!button) return;

  button.textContent = isCompared(product.id)
    ? "Compared"
    : "+ Compare";

  button.onclick = () => {
    const success = addCompareId(product.id);

    if (!success) {
      alert("You can compare only two products.");
      return;
    }

    button.textContent = "Compared";
  };
}