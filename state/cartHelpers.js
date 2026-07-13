function normalizeNullable(value) {
    return value ?? null;
}

/**
 * @param {object} firstItem
 * @param {object} secondItem
 * @returns {boolean}
 */

export function isSameCartLine(firstItem, secondItem) {
    if (!firstItem || !secondItem) {
        return false;
    }

    return (
        firstItem.id === secondItem.id &&
        normalizeNullable(firstItem.size) === normalizeNullable(secondItem.size) &&
        normalizeNullable(firstItem.color) === normalizeNullable(secondItem.color)
    );
}

/**
 * @param {Array} [cart=[]]
 * @returns {Array}
 */
export function cloneCart(cart = []) {
    return cart.map((item) => ({ ...item }));
}

/**
 * @param {Array} cart
 * @param {number|string|object} target
 * @returns {object|undefined|null}
 */

export function findCartItem(cart, target) {
    if (typeof target === "number" || typeof target === "string") {
        return cart.find((item) => item?.id === target);
    }

    if (target && typeof target === "object") {
        return cart.find((item) => isSameCartLine(item, target));
    }

    return null;
}

/**
 * @param {object} product
 * @returns {object}
 */

export function createCartItem(product) {
    return {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price ?? 0,
        oldPrice: product.oldPrice ?? null,
        discount: product.discount ?? null,
        size: product.size ?? null,
        color: product.color ?? null,
        quantity: product.quantity ?? 1,
    };
}