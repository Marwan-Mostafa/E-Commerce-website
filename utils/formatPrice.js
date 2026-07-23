export function formatPrice(price) {
    const safePrice = Number.isFinite(price) ? price : 0;
    return "Rp " + safePrice.toLocaleString("id-ID");
}