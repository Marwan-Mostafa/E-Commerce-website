import { ProductCard } from "./ProductCard.js";

export function ProductGrid(products, viewMode) {
  const layout = viewMode === 'grid'? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" : "flex flex-col gap-6";

  return `
    <div class="${layout}">
      ${products.map(ProductCard).join("")}
    </div>
  `;
}