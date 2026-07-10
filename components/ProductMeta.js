export function ProductMeta(product) {
    return `
    <hr class="border-border" />

    <div class="flex flex-col gap-2.5 text-sm text-mid">

      <div class="flex gap-3">
        <span class="min-w-[72px]">SKU</span>
        <span class="text-dark/50">:</span>
        <span id="meta-sku" class="text-dark/70">
          SKU-${product.id}
        </span>
      </div>

      <div class="flex gap-3">
        <span class="min-w-[72px]">Category</span>
        <span class="text-dark/50">:</span>
        <span id="product-category" class="text-dark/70">
          ${product.category}
        </span>
      </div>

      <div class="flex gap-3">
        <span class="min-w-[72px]">Tags</span>
        <span class="text-dark/50">:</span>
        <span id="product-tags" class="text-dark/70">
          ${product.category}
        </span>
      </div>

      <div class="flex gap-3 items-center">

        <span class="min-w-[72px]">Share</span>

        <span class="text-dark/50">:</span>

        <div class="flex gap-3 ml-1">

          <button
            id="share-facebook"
            class="hover:text-gold transition-colors"
            aria-label="Share on Facebook">

            <i class="fa-brands fa-facebook-f"></i>

          </button>

          <button
            id="share-linkedin"
            class="hover:text-gold transition-colors"
            aria-label="Share on LinkedIn">

            <i class="fa-brands fa-linkedin-in"></i>

          </button>

          <button
            id="share-twitter"
            class="hover:text-gold transition-colors"
            aria-label="Share on Twitter">

            <i class="fa-brands fa-x-twitter"></i>

          </button>

        </div>

      </div>

    </div>
  `;
}