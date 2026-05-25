import { initSliderState } from "../../state/sliderState.js";
import { inspirations } from "../../data/inspirations.js";
import { InspirationContent } from "./InspirationContent.js";
import { InspirationSlider } from "./InspirationSlider.js";

export function InspirationSection(){

    initSliderState(inspirations.length)

    const section = document.createElement("section")
    section.className = "inspiration-section w-[1440px] flex items-center gap-18 px-16 py-12 bg-[#FFF9F0]"
    

    section.appendChild(InspirationContent())
    section.appendChild(InspirationSlider(inspirations))

    return section
}