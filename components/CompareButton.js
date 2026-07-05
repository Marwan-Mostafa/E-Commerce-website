import { addProductToCompare, isCompared } from "../state/compareState.js";

export function renderCompareButton(product) {
  const button = document.getElementById("compare-btn");

  if (!button) return;

  updateButton(button, product.id);

  button.addEventListener("click", () => {
    const result = addProductToCompare(product.id)

    if (result.status === "open") {
      window.location.href = "../comparisonPage/productComparison.html";
      return
    }

    updateButton(button, product.id)

    if (result.status === "ready") {
      window.location.href = "../comparisonPage/productComparison.html";
      return
    }

    alert("Product added. Select another product.");
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