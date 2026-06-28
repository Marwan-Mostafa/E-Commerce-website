import { addCompareId, getCount, isCompared } from "../state/compareState.js";

export function renderCompareButton(product) {
  const button = document.getElementById("compare-btn");

  if (!button) return;

  updateButton(button, product.id);

  button.addEventListener("click", () => {
    if (isCompared(product.id)) {
      window.location.href = "../comparisonPage/productComparison.html";
      return;
    }

    const success = addCompareId(product.id);

    if (!success) {
      alert("You can compare only two products.");
      return;
    }

    updateButton(button, product.id);

    if (getCount() === 2) {
      window.location.href = "../comparisonPage/productComparison.html";
    } else {
      alert("Product added to compare. Select another product.");
    }
  });
}

function updateButton(button, id) {
  if (isCompared(id)) {
    button.textContent = "Compared";
    button.classList.add("bg-white", "text-black");
    button.classList.remove("border-yellow-700");
  } else {
    button.textContent = "+ Compare";
    button.classList.remove("bg-yellow-100", "text-white");
    button.classList.add("border-yellow-200");
  }
}