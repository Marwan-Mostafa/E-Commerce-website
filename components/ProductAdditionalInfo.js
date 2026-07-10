export function ProductAdditionalInfo(product) {

    const specs = product.specs ?? {};

    const rows = [];

    Object.values(specs).forEach(section => {

        Object.entries(section).forEach(([key, value]) => {

            rows.push(`
        <tr class="border-b">

          <td
            class="py-3 px-4 font-medium capitalize text-[#3A3A3A]">

            ${key.replace(/([A-Z])/g, " $1")}

          </td>

          <td
            class="py-3 px-4 text-[#9F9F9F]">

            ${value}

          </td>

        </tr>
      `);

        });

    });

    return `

    <div class="max-w-5xl mx-auto overflow-x-auto">

      <table class="w-full border-collapse">

        <thead>

          <tr class="bg-[#F9F1E7]">

            <th class="text-left px-4 py-4">

              Attribute

            </th>

            <th class="text-left px-4 py-4">

              Details

            </th>

          </tr>

        </thead>

        <tbody>

          ${rows.join("")}

        </tbody>

      </table>

    </div>

  `;
}