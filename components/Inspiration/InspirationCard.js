export function InspirationCard({ image, caption }) {
    return `
    <figure class="relative w-full h-full rounded-[10px] overflow-hidden m-0">
      <img
        src="${image}"
        alt=""
        loading="lazy"
        class="w-full h-full object-cover"
      />
      ${caption ? `
        <figcaption class="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-md px-5 py-4 max-w-[220px]">
          <p class="text-xs text-gray-500">${caption.index} — ${caption.room}</p>
          <p class="text-lg font-bold text-gray-900">${caption.title}</p>
        </figcaption>
      ` : ''}
    </figure>
  `;
}