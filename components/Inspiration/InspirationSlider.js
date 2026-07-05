import { renderCarousel } from '../Carousel.js';
import { InspirationCard } from './InspirationCard.js';
import { inspirationSlides } from '../../data/inspirations.js';

export const INSPIRATION_CAROUSEL_ID = 'inspiration-carousel';

export function renderInspirationSlider() {
  const slidesHtml = inspirationSlides.map(InspirationCard);

  return renderCarousel({
    id: INSPIRATION_CAROUSEL_ID,
    slides: slidesHtml,
    ariaLabel: 'Room inspiration gallery',
  });
}