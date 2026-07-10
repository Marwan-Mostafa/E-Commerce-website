import { productState } from "../../state/productState.js";

export function setupGallery(product) {
  const thumbnailsContainer = document.getElementById("thumbnails");
  const mainImage = document.getElementById("main-image");

  if (!thumbnailsContainer || !mainImage) return;

  const images =
    Array.isArray(product.images) && product.images.length
      ? product.images
      : [product.image];

  productState.selectedImage = images[0];
  mainImage.src = images[0];
  mainImage.alt = product.name;

  // Render Thumbnails
  thumbnailsContainer.innerHTML = images
    .map(
      (image, index) => `
        <button
          type="button"
          class="thumb ${index === 0 ? "active" : ""}"
          data-image="${image}"
        >
          <img
            src="${image}"
            alt="${product.name}"
            class="w-full h-16 object-cover"
          />
        </button>
      `
    )
    .join("");

  const thumbnails = thumbnailsContainer.querySelectorAll(".thumb");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const image = thumb.dataset.image;

      if (image === productState.selectedImage) return;

      productState.selectedImage = image;

      mainImage.classList.add("opacity-50");

      setTimeout(() => {
        mainImage.src = image;
        mainImage.classList.remove("opacity-50");
      }, 150);

      thumbnails.forEach((item) => item.classList.remove("active"));
      thumb.classList.add("active");
    });
  });
}