import { ComparisonPromo } from "./ComparisonPromo.js";
import { ComparisonCards } from "./ComparisonCards.js";

export function ComparisonSection(products = []) {

  return `
    <section
      class="grid lg:grid-cols-[280px_1fr] gap-8">

      ${ComparisonPromo()}
      ${ComparisonCards(products)}

    </section>
  `;
}