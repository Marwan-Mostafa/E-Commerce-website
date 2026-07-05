export function renderCategoryCard({ id, label, image }) {
  return `
    
      href="/pages/shop.html?category=${id}"
      class="group relative overflow-hidden flex flex-col rounded-xl shadow-sm hover:shadow-2xl
             transition-all duration-500
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary) focus-visible:ring-offset-2"
      aria-label="Browse ${label} category"
    >
      <img
        src="${image}"
        alt=""
        loading="lazy"
        class="w-full h-full object-cover group-hover:scale-103 transition duration-700"
      />
      <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent
                  group-hover:from-black/25 transition duration-500"></div>
      <div class="p-6 absolute bottom-0 w-full text-center">
        <p class="text-white text-xl font-semibold translate-y-2 group-hover:translate-y-0 transition duration-500">
          ${label}
        </p>
      </div>
    </a>
  `;
}