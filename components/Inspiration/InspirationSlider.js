// import { InspirationCard } from ""

import { getSliderState, setSliderIndex } from "../../state/sliderState.js";

export function InspirationSlider(inspirations){
    const wrapper = document.createElement("div")
    wrapper.className = "relative flex-1 overflow-hidden"

    const track = document.createElement("div")
    track.className = "flex transition-transform duration-500"
    track.id = "slider-track"

    inspirations.forEach((room)=> {
        track.appendChild(InspirationCard(room))
    })

    const nextBtn = document.createElement("button")

    nextBtn.className = `
    absolute right-4 top-1/2 -translate-y-1/2 z-10
    w-10 h-10 bg-white rounded-full shadow-md
    flex items-center justify-center hover:bg-[#B88E2F] 
    hover:text-white transition-colors
    `

    nextBtn.innerHTML = `<i class="ti ti-arrow-right"></i>`

    nextBtn.addEventListener("click", ()=> goToNext(inspirations.length))

    const dotContainer = document.createElement("div")
    dotContainer.className = "flex gap-2 mt-4 justify-center"
    dotContainer.id = "dots-container"
    renderDots(dotContainer, inspirations.length)

    wrapper.appendChild(track)
    wrapper.appendChild(nextBtn)
    wrapper.appendChild(dotContainer)

    return wrapper
}

// function goToNext()
// function updateTrackPosition
// function renderDots
// function updateDots