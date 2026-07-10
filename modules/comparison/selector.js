import {
    getCompareIds,
    replaceCompareId,
} from "../../state/compareState.js";

export function setupComparisonSelector({
    products,
    rerender,
}) {

    const selects = document.querySelectorAll(
        "[data-slot]"
    );

    if (!selects.length) return;

    selects.forEach((select) => {

        select.addEventListener("change", () => {

            const slot = Number(select.dataset.slot);

            const newProductId = Number(select.value);

            const compareIds = getCompareIds();

            const currentProductId = compareIds[slot];

            if (
                currentProductId === undefined ||
                currentProductId === newProductId
            ) {
                return;
            }

            replaceCompareId(currentProductId, newProductId);
                
            rerender();

        });

    });

}