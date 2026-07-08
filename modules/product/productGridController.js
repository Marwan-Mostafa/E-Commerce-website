import { products } from '../../data/products.js';
import { ProductCard } from '../../components/ProductCard.js';
import { handleProductCardAction, copyProductLink } from '../../handlers/productCardActions.js';
import { addToCart } from '../../state/cartState.js';
import { setupFilters } from '../../state/wishlistState.js';
import { addProductToCompare } from '../../state/compareState.js';

const PAGE_SIZE = 8;

export function initProductGrid(rootId = 'products-root') {
    const root = document.getElementById(rootId);
    if (!root) return;

    const grid = root.querySelector('#product-grid-list');
    const showMoreBtn = root.querySelector('#show-more-btn');

    root.addEventListener('click', (event) => {
        handleProductCardAction(event, products, {
            onAddToCart: (product) => {
                // Catalog `quantity` is stock count, not cart quantity — must override to 1.
                addToCart({ ...product, quantity: 1 });
            },
            onWishlist: (product) => {
                toggleWishlist(product);
            },
            onCompare: (product) => {
                addProductToCompare(product.id);
            },
            onShare: (product) => {
                copyProductLink(product);
            },
        });
    });

    showMoreBtn?.addEventListener('click', () => {
        const currentCount = Number(grid.dataset.visibleCount);
        const nextBatch = products.slice(currentCount, currentCount + PAGE_SIZE);
        const nextCount = currentCount + nextBatch.length;

        grid.insertAdjacentHTML('beforeend', nextBatch.map(ProductCard).join(''));
        grid.dataset.visibleCount = String(nextCount);

        if (nextCount >= products.length) {
            showMoreBtn.remove();
        }
    });
}