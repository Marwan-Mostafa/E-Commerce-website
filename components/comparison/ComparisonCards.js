import { ComparisonProductCard } from "./ComparisonProductCard.js";

export function ComparisonCards(products = []) {

    return `
    <div
      class="
        flex
        gap-8
        flex-wrap
      ">

      ${products
            .map((product, index) => ComparisonProductCard(product, index))
            .join("")}

    </div>
  `;
}