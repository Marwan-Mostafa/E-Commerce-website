const COLOR_CLASS = `
color-swatch
w-8
h-8
rounded-full
border-2
border-white
shadow-sm
cursor-pointer
transition-all
duration-300
hover:scale-110
`;

export function ProductColorSelector(product) {

  const colors = product.colors || [];

  if (!colors.length) return "";

  return `
    <div
      id="color-group"
      class="flex flex-wrap gap-4">

      ${colors
      .map(({ hex, name }, index) => `
      <button
        type="button"
        class="${COLOR_CLASS} ${index === 0 ? "ring-2 ring-[#B88E2F] ring-offset-1 scale-110" : ""}"
        data-color="${hex}"
        data-index="${index}"
        aria-label="${name}"
        aria-pressed="${index === 0}"
        title="${name}"
        style="background-color:${hex};">

      </button>
  `)
      .join("")}

    </div>
  `;
}