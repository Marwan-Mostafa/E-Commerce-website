import { products } from '../data/products.js';
import { ProductCard } from './ProductCard.js';

const PREVIEW_COUNT = 8;

export function renderProductGrid() {
  const visibleProducts = products.slice(0, PREVIEW_COUNT);

  return `
    <div class="w-full flex flex-col items-center gap-15 py-10 px-4 mt-25">
      <h2 id="products-heading" class="font-bold text-2xl md:text-3xl text-gray-800">Our Products</h2>

      <div class="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        ${visibleProducts.map(ProductCard).join('')}
      </div>

      
       <a href="/pages/shop/shop.html"
        class="border-2 border-(--primary) text-(--primary) font-semibold px-10 py-3 text-center
               hover:bg-(--primary) hover:text-white transition duration-300
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary) focus-visible:ring-offset-2"
      >
        Show More
      </a>
    </div>
  `;
}