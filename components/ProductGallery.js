export function ProductGallery(product) {

  const images =
    Array.isArray(product.images) && product.images.length
      ? product.images
      : [product.image];

  return `
    <div class="grid grid-cols-[90px_1fr] gap-6 items-start">

      <!-- Thumbnails -->

      <div
        id="thumbnails"
        class="flex flex-col gap-4">

        ${images
      .map(
        (image, index) => `
              <button
                type="button"
                class="
                  thumb
                  ${index === 0 ? "active" : ""}
                  rounded-xl
                  overflow-hidden
                  border
                  border-transparent
                  hover:border-[#B88E2F]
                  transition
                "
                data-image="${image}">

                <img
                  src="${image}"
                  alt="${product.name}"
                  class="w-full h-20 object-cover" />

              </button>
            `
      )
      .join("")}

      </div>

      <!-- Main Image -->

      <div
        class="
          bg-[#F9F1E7]
          rounded-2xl
          overflow-hidden
          flex
          items-center
          justify-center
          p-8
        ">

        <img
          id="main-image"
          src="${images[0]}"
          alt="${product.name}"
          class="
            w-full
            max-h-[500px]
            object-contain
            transition-opacity
            duration-300
          ">

      </div>

    </div>
  `;
}