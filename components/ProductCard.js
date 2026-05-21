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
          <div class="absolute top-3 right-3 bg-red-400 text-white text-md w-[48px] px-1 p-3 font-semibold rounded-full">
            ${product.discount}
          </div>
        ` : ""}

        <div class="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition">

          <button class="bg-white px-10 py-2 text-sm font-semibold text-(--primary) cursor-pointer
          duration-300 transition-all hover:shadow-black/20 hover:-translate-y-1 active:scale-90"
                  onclick='addToCartHandler(${product.id})'>
            Add to cart
          </button>

          <div class="flex gap-4 mt-4 text-white text-sm font-semibold">
           
            <button onclick='share(${product.id})' class="cursor-pointer hover:text-gray-700 duration-300 
                        transition-all hover:shadow-black/20 hover:-translate-y-1 active:scale-90">
              <i class="fa-solid fa-share-nodes"></i> Share
            </button>

            <button onclick='compare(${product.id})' class="cursor-pointer hover:text-gray-700 duration-300
                        transition-all hover:shadow-black/20 hover:-translate-y-1 active:scale-90">
              <i class="fa-solid fa-arrow-right-arrow-left"></i> Compare
            </button>

            <button onclick='wishlistHandler(${product.id})' class="cursor-pointer hover:text-gray-700 duration-300
                        transition-all hover:shadow-black/20 hover:-translate-y-1 active:scale-90">
              <i class="fa-regular fa-heart"></i> Like
            </button>

          </div>

        </div>

      </div>

      <div class="p-4 bg-gray-50">
        <h3 class="font-semibold text-lg">${product.name}</h3>
        <p class="text-sm text-gray-500 font-semibold">${product.category}</p>

        <div class="mt-3 flex items-center gap-3">
          
          <span class="font-bold text-lg text-gray-900">
            ${formatPrice(product.price)}
          </span>

          ${product.oldPrice? `
            <span class="text-gray-400 line-through text-sm">
              ${formatPrice(product.oldPrice)}
            </span>`: ""}

        </div>
      </div>

    </div>
  `;
}