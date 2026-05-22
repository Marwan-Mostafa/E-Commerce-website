import { createSlider } from "../../state/sliderState.js"
import { inspirations } from "../../data/inspirations.js"

export function renderInspiration(sectionId) {
    const section = document.getElementById(sectionId)

    if (!section) return

    const track = section.querySelector(".slides-track")
    const next = section.querySelector(".btn-next")

    track.innerHTML = inspirations.map((room) => `
    <div class="slide">
      <div class="slide-imgs">
        <img src="${room.images[0]}"/>
        <img src="${room.images[1]}"/>
      </div>
      
      <div class="room-card">
        <div class="room-card__info">
          <span class="room-num">0${room.id} — ${room.room}</span>
          <span class="room-name">${room.name}</span>
        </div>
        <button class="room-card__arrow" aria-label="view ${room.name}">→</button>
      </div>
    </div>
  `).join("");
  
  const dots = [...section.querySelectorAll(".dot")]
    const slider = createSlider(track, dots, inspirations.length);
    slider.goTo(0);

    next?.addEventListener("click", () =>
        slider.goTo(slider.getCurrent() + 1)
    );

    dots.forEach((dot, i) =>
        dot.addEventListener("click", () => slider.goTo(i))
    );
}