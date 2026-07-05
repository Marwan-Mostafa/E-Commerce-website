const ProductSelectorHTML = ({ allProducts, compareIds }) => {

    const availableProducts = allProducts.filter(
        (product) => !compareIds.includes(product.id)
    );

    const optionsHTML = availableProducts.length > 0
        ? availableProducts.map((product) => `
        <button class="product-selector__option
            w-full text-left px-4 py-3
            text-sm text-gray-700
            hover:bg-[#F9F1E7] hover:text-[#B88E2F]
            transition-colors duration-150
            border-b border-gray-100 last:border-b-0"
            data-product-id="${product.id}" type="button">
          ${product.name}
        </button>`).join('')
        : `<p class="px-4 py-3 text-sm text-gray-400 italic">
                No more products to add.
            </p>`

    return `<div id="product-selector" class="relative inline-block" data-selector>

                        <p class="text-[#B88E2F] font-semibold text-[16px] mb-3">
                            Add A Product
                        </p>
                        <button
                            id="product-selector__trigger"
                            type="button"
                            aria-expanded="false"
                            aria-haspopup="listbox"
                            class="
                            flex items-center justify-between
                            gap-8
                            w-[180px]
                            px-5 py-3
                            bg-[#B88E2F] text-white
                            rounded-[4px]
                            text-sm font-medium
                            cursor-pointer
                            transition-colors duration-200
                            hover:bg-[#a07828]
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-[#B88E2F]
                            focus-visible:ring-offset-2
                            "
                        >
        <span>Choose a Product</span>
        <i id="product-selector__chevron" class="fa-solid fa-chevron-down text-xs transition-transform duration-200"></i>
      </button>

      <div
        id="product-selector__dropdown"
        role="listbox"
        aria-label="Select a product to compare"
        class="
          hidden
          absolute top-full left-0 mt-2
          min-w-full w-[220px]
          bg-white
          border border-gray-200
          rounded-[8px]
          shadow-lg
          z-50
          overflow-hidden
        "
      >
        ${optionsHTML}
      </div>

    </div>
  `;
};

let detachProductSelectorListeners = () => { }


export const initProductSelector = (onProductSelect) => {
    detachProductSelectorListeners()

    const container = document.getElementById('product-selector');
    const trigger = document.getElementById('product-selector__trigger');
    const dropdown = document.getElementById('product-selector__dropdown');
    const chevron = document.getElementById('product-selector__chevron');


    if (!container || !trigger || !dropdown) {
        console.warn('ProductSelector: Required elements not found in DOM.');
        return;
    }

    let isOpen = false;

    const onTriggerClick = (e) => {
        e.stopPropagation();
        toggleDropdown();
    }

    const onDocumentClick = (e) => {
        if (!container.contains(e.target)) {
            closeDropdown();
        }
    }

    const onDocumentKeydown = (e) => {
        if (e.key === 'Escape' && isOpen) {
            closeDropdown();
            trigger.focus();
        }
    }

    const onDropdownClick = (e) => {
        const option = e.target.closest('.product-selector__option');
        if (!option) return;
        const productId = +option.dataset.productId;
        closeDropdown();
        onProductSelect(productId);
    }

    const openDropdown = () => {
        isOpen = true;
        dropdown.classList.remove('hidden');

        chevron.classList.add('rotate-180');

        trigger.setAttribute('aria-expanded', 'true');
    };

    const closeDropdown = () => {
        isOpen = false;
        dropdown.classList.add('hidden');

        chevron.classList.remove('rotate-180');

        trigger.setAttribute('aria-expanded', 'false');
    };

    const toggleDropdown = () => {
        isOpen ? closeDropdown() : openDropdown();
    };

    trigger.addEventListener('click', onTriggerClick);

    document.addEventListener('click', onDocumentClick);

    document.addEventListener('keydown', onDocumentKeydown);

    dropdown.addEventListener('click', onDropdownClick);

    detachProductSelectorListeners = () => {
        trigger.removeEventListener('click', onTriggerClick);
        document.removeEventListener('click', onDocumentClick);
        document.removeEventListener('keydown', onDocumentKeydown);
        dropdown.removeEventListener('click', onDropdownClick);
        detachProductSelectorListeners = () => { }
    }
};

export const ProductSelector = ({ allProducts, compareIds, onProductSelect }) => {
    return ProductSelectorHTML({ allProducts, compareIds });
};