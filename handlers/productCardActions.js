export function getProductCardAction(event, products) {
    const actionButton = event.target.closest('[data-action]');

    if (!actionButton) return null;

    const productCard = actionButton.closest('.product-card');

    if (!productCard) return null;

    const productId = Number(productCard.dataset.id);
    const product = products.find((item) => item.id === productId);

    if (!product) return null;

    return {
        action: actionButton.dataset.action,
        product,
    };
}

export function handleProductCardAction(event, products, handlers = {}) {
    const resolvedAction = getProductCardAction(event, products)

    if (!resolvedAction) return false

    const { action, product } = resolvedAction

    switch (action) {
        case "add-to-cart":
            handlers.onAddToCart?.(product)
            return true
        case "wishlist":
            handlers.onWishlist?.(product)
            return true
        case "share":
            handlers.onShare?.(product)
            return true
        case "compare":
            handlers.onCompare?.(product)
            return true
        default:
            return true
    }
}

export async function copyProductLink(product) {
    const productUrl = `${window.location.origin}/singleProduct/singleProduct.html?id=${product.id}`;

    if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(productUrl);
        return;
    }

    window.prompt('Copy product link', productUrl);
}