import { ProductCard } from "./ProductCard.js";

export function ProductGrid(products) {
  return `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      ${products.map(ProductCard).join("")}
    </div>
  `;
}