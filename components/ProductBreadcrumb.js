export function ProductBreadcrumb(product) {
  return `
    <section class="bg-[#F9F1E7] py-6">

      <div class="max-w-[1286px] mx-auto px-6 flex items-center gap-6 text-sm">

        <a
          href="../../pages/home/home.html"
          class="text-gray-500 hover:text-[#B88E2F] transition">

          Home

        </a>

        <i class="fa-solid fa-chevron-right text-xs text-gray-400"></i>

        <a
          href="../../pages/shop/shop.html"
          class="text-gray-500 hover:text-[#B88E2F] transition">

          Shop

        </a>

        <i class="fa-solid fa-chevron-right text-xs text-gray-400"></i>

        <span class="w-px bg-gray-300"></span>

        <span class="font-medium text-gray-900">
          ${product.name}
        </span>

      </div>

    </section>
  `;
}