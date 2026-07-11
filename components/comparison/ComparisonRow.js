import { getLabel, getSpecValue } from "./comparisonHelpers.js";

export function ComparisonRow({
  groupKey,
  fieldKey,
  products,
}) {
  return `
    <div
      class="
      text-center
        py-5 pr-6
        border-b
        border-[#E8E8E8]
        font-medium
        text-[#242424]">

      ${getLabel(fieldKey)}

    </div>

    ${products
      .map(
        (product) => `
          <div
            class=" text-center py-5 px-6
              border-b border-[#E8E8E8]
              text-[#666666] leading-7">

            ${getSpecValue(
          product,
          groupKey,
          fieldKey
        )}
          </div>
        `).join("")}`
}