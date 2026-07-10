export function ProductSizeSelector(product) {
    const sizes = product.sizes ?? ["L", "XL", "XS"];

    return `
    <div
      id="size-group"
      class="flex gap-4">

      ${sizes
            .map(
                (size, index) => `
            <button
              type="button"
              class="size-btn ${index === 0 ? "active" : ""
                    } w-10 h-10 rounded-lg border border-[#D9D9D9]
              hover:bg-[#B88E2F] hover:text-white transition"
              data-size="${size}">

              ${size}

            </button>
          `
            )
            .join("")}

    </div>
  `;
}