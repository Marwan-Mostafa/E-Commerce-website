import { InspirationCard } from "./InspirationCard.js";
import { getSliderState, setSliderIndex } from "../../state/sliderState.js";

export function InspirationSlider(inspirations) {

    const outerDiv = document.createElement("div")
    outerDiv.style.cssText = "flex: 1; min-width: 0;"
    // ↑ min-width: 0 مهمة جداً مع flex عشان ماتتمددش

    const wrapper = document.createElement("div")
    wrapper.style.cssText = "position: relative; overflow: hidden; width: 100%;"

    const track = document.createElement("div")
    track.id = "slider-track"
    track.style.cssText = `
        display: flex;
        width: ${inspirations.length * 100}%;
        transition: transform 0.5s ease-in-out;
    `

    inspirations.forEach((room) => {
        const card = InspirationCard(room)
        card.style.width = `${100 / inspirations.length}%`
        // ↑ كل card = جزء من الـ track الكلي
        track.appendChild(card)
    })

    const nextBtn = document.createElement("button")
    nextBtn.style.cssText = `
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        width: 40px;
        height: 40px;
        background: white;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    `
    nextBtn.innerHTML = `→`
    nextBtn.addEventListener("click", () => goToNext(inspirations.length))

    const dotContainer = document.createElement("div")
    dotContainer.id = "dots-container"
    dotContainer.style.cssText = "display:flex; gap:8px; justify-content:center; margin-top:16px;"
    renderDots(dotContainer, inspirations.length)

    wrapper.appendChild(track)
    wrapper.appendChild(nextBtn)
    outerDiv.appendChild(wrapper)
    outerDiv.appendChild(dotContainer)

    return outerDiv
}

function goToSlider(index) {
    setSliderIndex(index)
    updateTrackPosition(index)
    updateDots(index)
}

function goToNext(total) {
    const { currentIndex } = getSliderState()
    const next = (currentIndex + 1) % total
    goToSlider(next)
}

function updateTrackPosition(index) {
    const track = document.getElementById("slider-track")
    // ✅ العرض الفعلي للـ wrapper (مش الـ track كله)
    const wrapperWidth = track.parentElement.offsetWidth
    track.style.transform = `translateX(-${index * wrapperWidth}px)`
}

function renderDots(container, total) {
    container.innerHTML = ""
    const { currentIndex } = getSliderState()
    for (let i = 0; i < total; i++) {
        const dot = document.createElement("button")
        dot.style.cssText = `
            width: ${i === currentIndex ? "24px" : "8px"};
            height: 8px;
            border-radius: 4px;
            border: none;
            cursor: pointer;
            background: ${i === currentIndex ? "#B88E2F" : "#D9D9D9"};
            transition: all 0.3s ease;
        `
        dot.addEventListener("click", () => goToSlider(i))
        container.appendChild(dot)
    }
}

function updateDots(activeIndex) {
    const dots = document.querySelectorAll("#dots-container button")
    dots.forEach((dot, i) => {
        dot.style.width = i === activeIndex ? "24px" : "8px"
        dot.style.background = i === activeIndex ? "#B88E2F" : "#D9D9D9"
    })
}