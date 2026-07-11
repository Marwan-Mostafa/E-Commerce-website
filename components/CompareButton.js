export function renderCompareButton(product) {

  const button = document.getElementById("compare-btn");

  if (!button) return;

  updateButton(button);

  button.addEventListener("click", () => {

    window.location.href =
      `../comparison/comparison.html?first=${product.id}`;

  });

}

function updateButton(button) {

  button.textContent = "+ Compare";

  button.classList.remove(
    "bg-white",
    "text-black"
  );

  button.classList.add(
    "border-gray-300"
  );

}