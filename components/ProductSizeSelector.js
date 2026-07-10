const BASE_BUTTON_CLASS = `
size-btn
w-10
h-10
rounded-lg
border
text-sm
font-medium
transition-all
duration-300
cursor-pointer
focus:outline-none
focus:ring-2
focus:ring-[#B88E2F]
focus:ring-offset-2
`;

const ACTIVE_CLASS = `
bg-[#B88E2F]
border-[#B88E2F]
text-white
`;

const INACTIVE_CLASS = `
bg-white
border-[#D9D9D9]
text-[#3A3A3A]
hover:border-[#B88E2F]
hover:bg-[#B88E2F]
hover:text-white
`;

export function ProductSizeSelector(product) {

  const sizes = product.sizes ?? [];

  if (!sizes.length) return "";

  return `
    <div
      id="size-group"
      class="flex flex-wrap gap-3">

      ${sizes
      .map(
        (size, index) => `
            <button
              type="button"
              class="
                ${BASE_BUTTON_CLASS}
                ${index === 0 ? ACTIVE_CLASS : INACTIVE_CLASS}
              "
              data-size="${size}"
              aria-label="Select size ${size}"
              aria-pressed="${index === 0}">

              ${size}

            </button>
          `
      )
      .join("")}

    </div>
  `;
}