export function ProductMeta(product) {
  const tags = Array.isArray(product.tags)
    ? product.tags.join(", ")
    : product.tags || product.category;

  return `
    <div class="pt-10 mt-10 border-t border-[#D9D9D9]">

      <div class="space-y-4 text-sm">

        <div class="grid grid-cols-[90px_20px_1fr] items-center">

          <span class="text-[#9F9F9F]">
            SKU
          </span>

          <span class="text-[#9F9F9F]">
            :
          </span>

          <span class="text-[#666666] font-medium">
            ${product.sku ?? `SKU-${product.id}`}
          </span>

        </div>

        <div class="grid grid-cols-[90px_20px_1fr] items-center">

          <span class="text-[#9F9F9F]">
            Category
          </span>

          <span class="text-[#9F9F9F]">
            :
          </span>

          <span class="text-[#666666]">
            ${product.category}
          </span>

        </div>

        <div class="grid grid-cols-[90px_20px_1fr] items-center">

          <span class="text-[#9F9F9F]">
            Tags
          </span>

          <span class="text-[#9F9F9F]">
            :
          </span>

          <span class="text-[#666666]">
            ${tags}
          </span>

        </div>

        <div class="grid grid-cols-[90px_20px_1fr] items-center">

          <span class="text-[#9F9F9F]">
            Share
          </span>

          <span class="text-[#9F9F9F]">
            :
          </span>

          <div class="flex items-center gap-5 text-lg text-[#666666]">

            <button
              id="share-facebook"
              type="button"
              aria-label="Share on Facebook"
              class="transition hover:text-[#B88E2F] cursor-pointer">

              <i class="fa-brands fa-facebook-f"></i>

            </button>

            <button
              id="share-linkedin"
              type="button"
              aria-label="Share on LinkedIn"
              class="transition hover:text-[#B88E2F] cursor-pointer">

              <i class="fa-brands fa-linkedin-in"></i>

            </button>

            <button
              id="share-twitter"
              type="button"
              aria-label="Share on X"
              class="transition hover:text-[#B88E2F] cursor-pointer">

              <i class="fa-brands fa-x-twitter"></i>

            </button>

          </div>

        </div>

      </div>

    </div>
  `;
}