export function renderHeroBanner() {
    return `
    <section class="relative w-full " aria-label="Featured collection">
      <img
        src="/assets/images/banner.png"
        alt=""
        class="w-full h-[500px] md:h-[700px] object-cover"
      />
      <div class="absolute inset-0 flex items-center justify-center md:justify-end px-6 md:px-20 -bottom-25">
        <div class="bg-[#FFF3E3] w-full sm:w-[90%] md:w-[550px] lg:w-[643px] p-6 md:p-10 rounded-[10px]">
          <div class="flex flex-col gap-6">
            <p class="text-sm font-semibold tracking-[3px]">New Arrival</p>
            <h1 class="font-bold text-[28px] leading-tight md:text-[40px] lg:text-[52px] text-(--primary)">
              Discover Our New Collection
            </h1>
            <p class="text-sm md:text-lg font-medium leading-6 text-black/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
            </p>
            
              <a href="/pages/shop/shop.html"
              class="text-center capitalize text-white font-bold w-full sm:w-[220px] rounded-full
                     h-[55px] md:h-[65px] flex items-center justify-center bg-(--primary)
                     transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:scale-95
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary) focus-visible:ring-offset-2"
            >
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}