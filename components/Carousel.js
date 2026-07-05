export function renderCarousel({ id, slides, ariaLabel }) {
  const slideCount = slides.length;
  const trackId = `${id}-track`;

  const slidesHtml = slides
    .map(
      (slideHtml, index) => `
        <div
          class="carousel-slide w-full h-full shrink-0"
          role="group"
          aria-roledescription="slide"
          aria-label="${index + 1} of ${slideCount}"
          ${index !== 0 ? 'inert' : ''}
        >
          ${slideHtml}
        </div>
      `
    )
    .join('');

  const dotsHtml = slides
    .map(
      (_, index) => `
        <button
          type="button"
          class="carousel-dot w-2.5 h-2.5 rounded-full transition-colors duration-300
                 ${index === 0 ? 'bg-(--primary)' : 'bg-gray-300 hover:bg-gray-400'}
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary) focus-visible:ring-offset-2"
          aria-label="Go to slide ${index + 1}"
          aria-current="${index === 0 ? 'true' : 'false'}"
          data-slide-index="${index}"
        ></button>
      `
    )
    .join('');

  return `
    <div
      id="${id}"
      class="carousel relative flex flex-col h-full"
      data-current-index="0"
      role="region"
      aria-roledescription="carousel"
      aria-label="${ariaLabel}"
    >
      <div class="carousel-viewport relative flex-1 min-h-0 overflow-hidden rounded-[10px]">
        <div id="${trackId}" class="carousel-track flex h-full transition-transform duration-500 ease-out motion-reduce:transition-none">
          ${slidesHtml}
        </div>

        <button
          type="button"
          class="carousel-prev absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 rounded-full
                 bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary)"
          aria-label="Previous slide"
          aria-controls="${trackId}"
        >
          <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
        </button>

        <button
          type="button"
          class="carousel-next absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full
                 bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary)"
          aria-label="Next slide"
          aria-controls="${trackId}"
        >
          <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
        </button>
      </div>

      <div class="carousel-dots flex justify-center gap-2 mt-4 shrink-0" role="group" aria-label="Slide navigation">
        ${dotsHtml}
      </div>

      <p id="${id}-status" class="sr-only" aria-live="polite">Slide 1 of ${slideCount}</p>
    </div>
  `;
}