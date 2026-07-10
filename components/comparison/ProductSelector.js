const SELECT_CLASS = `
comparison-product-selector
w-full
border
border-[#D9D9D9]
rounded-md
px-4
py-3
cursor-pointer
outline-none
transition-all
duration-300
focus:border-[#B88E2F]
hover:border-[#B88E2F]
`;

export function ProductSelector(
    currentProductId,
    products = [],
    slot = 0
) {
    return `
    <div class="mt-5">

      <label
        class="block text-sm text-[#9F9F9F] mb-2">

        Choose Product

      </label>

      <select
        class="${SELECT_CLASS}"
        data-slot="${slot}"
        data-product="${currentProductId}">

        ${products
            .map(
                (product) => `
            <option
              value="${product.id}"
              ${product.id === currentProductId ? "selected" : ""}>

              ${product.name}

            </option>
          `
            )
            .join("")}

      </select>

    </div>
  `;
}