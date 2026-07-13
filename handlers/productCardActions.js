function createProductUrl(productId) {
    return `${window.location.origin}/pages/singleProduct/singleProduct.html?id=${encodeURIComponent(productId)}`;
}

function resolveProductCardAction(event, products) {
    if (!Array.isArray(products)) {
        return null;
    }

    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) {
        return null;
    }

    const productCard = actionButton.closest(".product-card");
    const productId = Number(

        actionButton.dataset.id ??

        productCard?.dataset.id

    );

    if (!productId) {

        return null;

    }

    const product = products.find(

        ({ id }) => id === productId

    );

    if (!product) {

        return null;

    }

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

    if (!resolvedAction) {

        return false;

    }

    event.preventDefault();

    const { action, product } = resolvedAction;

    const actionMap = {

        "view-product": handlers.onViewProduct,

        "add-to-cart": handlers.onAddToCart,

        wishlist: handlers.onWishlist,

        compare: handlers.onCompare,

        share: handlers.onShare,

    };

    const handler = actionMap[action];

    if (typeof handler !== "function") {

        return false;

    }

    handler(product);

    return true;

}

export function navigateToProduct(productId) {

    window.location.href = createProductUrl(productId);

}

export async function copyProductLink(product) {

    const productUrl = createProductUrl(product.id);

    try {

        if (navigator.clipboard?.writeText) {

            await navigator.clipboard.writeText(productUrl);

            return true;

        }

    }

    catch (error) {

        console.warn(

            "[ProductCard] Clipboard API unavailable.",

            error

        );

    }

    window.prompt(

        "Copy product link",

        productUrl

    );

    return false;

}