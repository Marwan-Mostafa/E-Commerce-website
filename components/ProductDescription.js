export function ProductDescription(product) {

    return `

    <div
      class="max-w-4xl mx-auto space-y-6 text-center">

      <p
        class="text-[#9F9F9F] leading-8">

        ${product.description ??
        "Premium furniture designed with modern aesthetics and crafted from high-quality materials."
        }

      </p>

    </div>

  `;
}