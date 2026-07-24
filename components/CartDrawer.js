export function CartDrawer() {
  return `

    <div
      id="cart-overlay"
      aria-hidden="true"
      class="fixed inset-0 bg-black/40 hidden z-40 transition-opacity duration-300">
    </div>


    <aside id="cart-drawer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      tabindex="-1"
      inert
      class="fixed top-0
        right-[-420px]
        w-[420px]
        h-screen
        bg-white z-50
        flex flex-col
        transition-all
        duration-300
        shadow-2xl">


      <div class="flex items-center justify-between p-6 border-b">

        <h2 id="cart-drawer-title" class="text-2xl font-semibold">
          Shopping Cart
        </h2>

        <button
          type="button"
          id="close-cart"
          aria-label="Close cart"
          class="text-2xl text-gray-500 hover:text-black transition cursor-pointer">
          ×
        </button>

      </div>


      <div id="cart-items" aria-live="polite" class="flex-1 overflow-y-auto p-6">
      </div>


      <div class="border-t p-6">

        <div class="flex justify-between mb-6">

          <span class="text-gray-500">
            Subtotal
          </span>

          <span id="cart-subtotal" class="font-semibold text-yellow-700">
            Rs. 0.00
          </span>

        </div>

        <div class="grid grid-cols-2 gap-3">

          <a href="../../pages/cart/cart.html"
            class="border rounded-lg py-3 text-center hover:bg-[#B88E2F] hover:text-white transition">

            Cart

          </a>

          <a href="../../pages/checkout/checkout.html"
            class="border rounded-lg py-3 text-center hover:bg-[#B88E2F] hover:text-white transition">

            Checkout

          </a>

        </div>

      </div>

    </aside>
  `
}