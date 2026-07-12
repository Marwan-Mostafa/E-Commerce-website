export function toPositiveInteger(
    value,
    fallback = 1

) {

    const number = Number(value);

    if (!Number.isInteger(number) || number <= 0) {
        return fallback;
    }
}


export function isValidProduct(product) {

    return (

        product &&
        typeof product === "object" &&
        product.id != null &&
        typeof product.name === "string" &&
        typeof product.price === "number"

    );

}

export function normalizeProduct(product) {

    return {
        ...product,
        quantity: toPositiveInteger(product.quantity, 1),
    };

}