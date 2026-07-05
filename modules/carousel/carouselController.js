export function initCarousel(carouselId) {
    const root = document.getElementById(carouselId);
    if (!root) return;

    const track = root.querySelector('.carousel-track');
    const slides = [...root.querySelectorAll('.carousel-slide')];
    const dots = [...root.querySelectorAll('.carousel-dot')];
    const prevBtn = root.querySelector('.carousel-prev');
    const nextBtn = root.querySelector('.carousel-next');

    const slideCount = slides.length;
    let currentIndex = 0;

    function goToSlide(index) {
        currentIndex = (index + slideCount) % slideCount;

        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        slides.forEach((slide, i) => {
            const isActive = i === currentIndex;
            slide.toggleAttribute('inert', !isActive);
        });

        dots.forEach((dot, i) => {
            const isActive = i === currentIndex;
            dot.setAttribute('aria-selected', String(isActive));
            dot.classList.toggle('bg-(--primary)', isActive);
            dot.classList.toggle('bg-gray-300', !isActive);
        });

        root.dataset.currentIndex = String(currentIndex);
    }

    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    root.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') goToSlide(currentIndex + 1);
        if (event.key === 'ArrowLeft') goToSlide(currentIndex - 1);
    });
}