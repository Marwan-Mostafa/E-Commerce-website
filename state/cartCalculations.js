export function getItemCount(cart = []) {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

export function getSubtotal(cart = []) {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getTotal(cart = []) {
    const subtotal = getSubtotal(cart);
    return subtotal + subtotal * 0.1; // Assuming a 10% tax rate
}

export function formatCurrency(amount = 0) {
    return `Rs. ${new Intl.NumberFormat("en-US",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }

    ).format(amount)}`;

}