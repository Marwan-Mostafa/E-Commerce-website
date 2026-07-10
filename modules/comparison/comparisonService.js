import { getCompareIds } from "../../state/compareState.js";

import { products } from "../../data/products.js";

export function getComparedProducts() {

    const ids = getCompareIds();

    return ids
        .map((id) =>
            products.find((product) => product.id === id)
        )
        .filter(Boolean);

}