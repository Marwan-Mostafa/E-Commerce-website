import { productState } from "../state/productState.js"

export function setupGallery() {
  const thumbnails = document.querySelectorAll(".thumb")
  const mainImage = document.getElementById("main-image")

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const image = thumb.dataset.image

      productState.selectedImage = image
      mainImage.classList.add("opacity-50");
      setTimeout(() => {
        mainImage.src = image;
        mainImage.classList.remove("opacity-50");
      }, 150);

      thumbnails.forEach((item) => {
        item.classList.remove("active")
      })
      thumb.classList.add("active")
    })
  })
}