const FALLBACK_IMAGE = "/assets/images/placeholder.png";

const THUMBNAIL_CLASS = `
  thumb
  group
  rounded-xl
  overflow-hidden
  border
  border-transparent
  transition-all
  duration-300
  hover:border-[#B88E2F]
  focus:outline-none
  focus:ring-2
  focus:ring-[#B88E2F]
`;

export function ProductGallery(product) {

  if (!product) return "";

  const images =
    Array.isArray(product.images) && product.images.length
      ? product.images
      : [product.image || FALLBACK_IMAGE];

  const mainImage = images[0];

  const thumbnails = images
    .map(
      (image, index) => `
        <button
          type="button"
          class="${THUMBNAIL_CLASS} ${index === 0 ? "active" : ""}"
          data-image="${image}"
          aria-label="View ${product.name} image ${index + 1}"
          ${index === 0 ? 'aria-current="true"' : ""}>

          <img
            src="${image}"
            alt="${product.name} Thumbnail ${index + 1}"
            width="120"
            height="120"
            loading="lazy"
            decoding="async"
            draggable="false"
            class="
              w-full
              h-20
              object-cover
              transition-transform
              duration-300
              group-hover:scale-105
              select-none
            ">

        </button>
      `
    )
    .join("");

  return `
    <section
      class="grid grid-cols-[90px_1fr] gap-6 items-start">

      <!-- Thumbnails -->

      <div
        id="thumbnails"
        class="flex flex-col gap-4">

        ${thumbnails}

      </div>

      <!-- Main Image -->

      <figure
        class="
          bg-[#F9F1E7]
          rounded-2xl
          overflow-hidden
          flex
          items-center
          justify-center
          p-8
          min-h-[500px]
        ">

        <img
          id="main-image"
          src="${mainImage}"
          alt="${product.name}"
          width="600"
          height="600"
          loading="eager"
          decoding="async"
          draggable="false"
          class="
            w-full
            max-w-[520px]
            max-h-[500px]
            object-contain
            transition-opacity
            duration-300
            select-none
          ">

        <figcaption class="sr-only">
          ${product.name} Product Image
        </figcaption>

      </figure>

    </section>
  `;
}