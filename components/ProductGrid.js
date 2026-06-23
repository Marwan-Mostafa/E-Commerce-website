import { ProductCard } from "./ProductCard.js";

export function ProductGrid(products, viewMode = "grid") {
  const layout = viewMode === 'grid'? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" : "flex flex-col gap-6";

  return `
  <div class="w-full max-w-7xl mx-auto">
    <div class="${layout}">
      ${products.map(ProductCard).join("")}
    </div>
  </div>
  `;
}