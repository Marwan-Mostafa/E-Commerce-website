import { ComparisonRow } from "./ComparisonRow.js";
import { collectGroupFields } from "./comparisonHelpers.js";

export function ComparisonGroup({
    group,
    products,
}) {

    const fields = collectGroupFields(products, group.key)

    if (!fields.length) {
        return ""
    }

    return `
    ${renderGroupHeader(group.label)}

    ${fields
            .map((fieldKey) =>
                ComparisonRow({
                    groupKey: group.key,
                    fieldKey,
                    products,
                })
            )
            .join("")}
  `;
}

function renderGroupHeader(title) {

    return `
    <div
      class="
        col-span-full
        pt-12
        pb-6
        border-b
        border-[#D9D9D9]
      ">

      <h2
        class="
          text-3xl
          font-semibold
          text-[#000]
        ">

        ${title}

      </h2>

    </div>
  `

}