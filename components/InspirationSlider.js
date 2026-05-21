import { inspirations } from "../data/inspirations.js"
import { sliderState } from "../state/slider.js"


export function renderSlider(){
    return `
    <div class="slider">
      ${inspirations.map((item, index) => `
        <div class="slide ${index === sliderState.currentIndex ? "active" : ""}">
          <img src="${item.image}" alt="${item.title}" />
        </div>
      `).join("")}
    </div>`
}