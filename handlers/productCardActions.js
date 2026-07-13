function resolveProductCardAction(event, products) {

    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) return null;

    const productCard = actionButton.closest(".product-card");
    const productId = Number(actionButton.dataset.id ?? productCard?.dataset.id);

    if (!productId) return null;

    return {
        action: actionButton.dataset.action,
        product,
    };

}

export function handleProductCardAction(
    event,
    products,
    handlers = {}
) {

    const resolvedAction = resolveProductCardAction(event, products);
    if (!resolvedAction) return false;

    event.preventDefault();
    event.stopPropagation();

    const { action, product } = resolvedAction;

    const actionMap = {
        "view-product": handlers.onViewProduct,
        "add-to-cart": handlers.onAddToCart,
        wishlist: handlers.onWishlist,
        compare: handlers.onCompare,
        share: handlers.onShare,
    };

    actionMap[action]?.(product);

    return true;

}

export async function copyProductLink(product) {

    const productUrl = `${window.location.origin}/pages/singleProduct/singleProduct.html?id=${product.id}`;

    try {

        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(productUrl);
            return;

        }

    } catch (error) {
        console.warn("[ProductCard] Clipboard API unavailable.", error);
    }

    window.prompt("Copy product link", productUrl);

}