const TAX_RATE = 0.1;

const currencyFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});


function toSafeNumber(value, fallback = 0) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
}


function roundToCents(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}


export function getItemCount(cart = []) {
    return cart.reduce(
        (total, item) => total + Math.max(0, toSafeNumber(item?.quantity)),
        0
    );
}



export function getSubtotal(cart = []) {
    const subtotal = cart.reduce(
        (total, item) =>
            total +
            Math.max(0, toSafeNumber(item?.price)) *
            Math.max(0, toSafeNumber(item?.quantity)),
        0
    );

    return roundToCents(subtotal);
}

export function getTotal(cart = []) {
    const subtotal = getSubtotal(cart);
    return roundToCents(subtotal + subtotal * TAX_RATE);
}



export function formatCurrency(amount = 0) {
    return `Rs. ${currencyFormatter.format(toSafeNumber(amount))}`;
}