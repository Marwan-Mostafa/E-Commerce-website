export function createSlider(trackEl, dots, total) {
    let current = 0

    function goTo(index) {
        current = (index + total) % total
        trackEl.style.transform = `translateX(-${current * 100}%)`
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === current)
        })
    }
    return {
        goTo,
        getCurrent: () => current
    }
}