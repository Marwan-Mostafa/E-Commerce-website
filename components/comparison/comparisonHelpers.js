import { SPEC_LABELS, EMPTY_VALUE } from "./comparisonConstants.js"


export function formatFallbackLabel(key) {
    return key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (char) => char.toUpperCase());
}

export function getLabel(key) {
    return SPEC_LABELS[key] ?? formatFallbackLabel(key);
}

export function getSpecValue(product, groupKey, fieldKey) {
    return (
        product?.specs?.[groupKey]?.[fieldKey] ??
        EMPTY_VALUE
    );
}

export function collectGroupFields(products, groupKey) {

    const fields = new Set();

    products.forEach((product) => {

        const group =
            product?.specs?.[groupKey];

        if (!group) return;

        Object.keys(group).forEach((field) => {
            fields.add(field);
        });

    });

    return [...fields];

}