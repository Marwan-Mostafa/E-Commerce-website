import { renderInspirationSlider } from './InspirationSlider.js';

export function renderInspirationSection() {
  return `
    <section aria-labelledby="inspiration-heading" class="w-full bg-(--cream) mt-25 py-16 px-4">
      <div class="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 items-center">

        <div class="flex flex-col gap-6">
          <h2 id="inspiration-heading" class="font-bold text-3xl md:text-4xl text-gray-800">
            50+ Beautiful rooms inspiration
          </h2>
          <p class="text-gray-500 max-w-md">
            Our designer already made a lot of beautiful prototypes of rooms that inspire you.
          </p>
          <a href="/pages/shop/shop.html"
            class="w-fit bg-(--primary) text-white font-bold px-8 py-3 rounded-md
                   hover:shadow-lg hover:-translate-y-0.5 transition duration-300
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary) focus-visible:ring-offset-2"
          >
            Explore More
          </a>
        </div>

        <div class="h-[400px]">
          ${renderInspirationSlider()}
        </div>

      </div>
    </section>
  `;
}