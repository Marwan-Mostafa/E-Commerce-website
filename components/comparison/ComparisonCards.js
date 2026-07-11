import { ComparisonProductCard } from "./ComparisonProductCard.js";

export function ComparisonCards(products = []) {

  return `
    <div
      class="
      flex
      justify-evenly
        flex-wrap
      ">

      ${products
      .map((product, index) => ComparisonProductCard(product, index))
      .join("")}

    </div>
  `;
}