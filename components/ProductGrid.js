const gridView = document.getElementById("gridView")
const listView = document.getElementById("listView")

gridView.addEventListener("click", () => {
    productsContainer.classList.remove("list-layout");
    productsContainer.classList.add("grid-layout");
});

listView.addEventListener("click", () => {
    productsContainer.classList.remove("grid-layout");
    productsContainer.classList.add("list-layout");
});

