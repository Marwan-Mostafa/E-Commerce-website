import { formatPrice } from "../utils/formatPrice.js"
import { addToCart } from "../state/cart.js"
import { toggleWishlist } from "../state/wishlist.js"

export function ProductCard(product) {
  return `
    <div class="group bg-white shadow-sm hover:shadow-xl transition duration-500 overflow-hidden">

      <div class="relative overflow-hidden">

        <img src="${product.image}"
             class="w-full h-72 object-cover group-hover:scale-110 transition duration-700" />

        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition"></div>

        ${product.discount ? `
          <div class="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
            ${product.discount}
          </div>
        ` : ""}

        <div class="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition">

          <button class="bg-white px-6 py-2 text-sm font-semibold"
                  onclick='addToCartHandler(${product.id})'>
            Add to cart
          </button>

          <div class="flex gap-4 mt-4 text-white text-sm">
            <button onclick='share(${product.id})'>Share</button>
            <button onclick='compare(${product.id})'>Compare</button>
            <button onclick='wishlistHandler(${product.id})'>Like</button>
          </div>

        </div>

      </div>

      <div class="p-4 bg-gray-50">
        <h3 class="font-semibold">${product.name}</h3>
        <p class="text-sm text-gray-500">${product.category}</p>

        <div class="mt-2 font-bold">
          ${formatPrice(product.price)}
        </div>
      </div>

    </div>
  `;
}