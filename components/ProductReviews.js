export function ProductReviews(product) {

    const reviews = product.reviewList ?? [];

    if (!reviews.length) {

        return `

      <div
        class="text-center py-12 text-[#9F9F9F]">

        No reviews yet.

      </div>

    `;
    }

    return `

    <div
      class="max-w-4xl mx-auto flex flex-col gap-6">

      ${reviews
            .map(
                review => `
            <div
              class="border rounded-xl p-6">

              <div
                class="flex justify-between items-center mb-3">

                <h3
                  class="font-semibold">

                  ${review.name}

                </h3>

                <span
                  class="text-sm text-[#9F9F9F]">

                  ${review.date}

                </span>

              </div>

              <p
                class="text-[#6F6F6F] leading-7">

                ${review.comment}

              </p>

            </div>
          `
            )
            .join("")}

    </div>

  `;
}