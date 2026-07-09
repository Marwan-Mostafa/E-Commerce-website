function resolveProductCardAction(event, products) {

    const actionButton =
        event.target.closest("[data-action]");

    if (!actionButton) return null;

    const productId =
        Number(
            actionButton.dataset.id ??
            actionButton.closest(".product-card")?.dataset.id
        );

    if (!productId) return null;

    const product =
        products.find(
            ({ id }) => id === productId
        );

    if (!product) return null;

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

    const resolvedAction =
        resolveProductCardAction(event, products);

    if (!resolvedAction) return false;

    const {
        action,
        product,
    } = resolvedAction;

    const actionMap = {

        "add-to-cart": handlers.onAddToCart,

        wishlist: handlers.onWishlist,

        compare: handlers.onCompare,

        share: handlers.onShare,

    };

    actionMap[action]?.(product);

    return true;

}

export async function copyProductLink(product) {

    const productUrl =
        `${window.location.origin}/pages/singleProduct/singleProduct.html?id=${product.id}`;

    try {

        if (navigator.clipboard?.writeText) {

            await navigator.clipboard.writeText(productUrl);

            return;

        }

    } catch (error) {

        console.warn("Clipboard API unavailable.", error);

    }

    window.prompt(
        "Copy product link",
        productUrl
    );

}