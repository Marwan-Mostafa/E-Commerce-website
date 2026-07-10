export function ProductTabs(product) {
    return `
    <section class="mx-auto flex flex-col items-center">

      <hr class="border-border mb-10 w-full" />

      <div
        id="tabs"
        class="flex gap-10 mb-8">

        <button
          class="tab-btn active"
          data-tab="description">

          Description

        </button>

        <button
          class="tab-btn"
          data-tab="additional">

          Additional Information

        </button>

        <button
          class="tab-btn"
          data-tab="reviews">

          Reviews [${product.review ?? 0}]

        </button>

      </div>

      <!-- Description -->

      <div
        id="tab-description"
        class="tab-content text-dark/70 text-sm leading-relaxed max-w-3xl space-y-4">

        <p>
          ${product.description ?? ""}
        </p>

      </div>

      <!-- Additional -->

      <div
        id="tab-additional"
        class="tab-content hidden text-sm leading-relaxed max-w-2xl">

        <table class="w-full border-collapse">

          <thead>

            <tr class="bg-light">

              <th class="text-left py-3 px-4 font-medium text-dark">
                Attribute
              </th>

              <th class="text-left py-3 px-4 font-medium text-dark">
                Details
              </th>

            </tr>

          </thead>

          <tbody id="additional-info">

          </tbody>

        </table>

      </div>

      <!-- Reviews -->

      <div
        id="tab-reviews"
        class="tab-content hidden">

        <div id="reviews-list">

        </div>

      </div>

    </section>
  `;
}