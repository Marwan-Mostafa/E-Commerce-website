import { formatPrice } from "../../utils/formatPrice.js";

const ROW_CLASS = `
cart-row
grid
grid-cols-[110px_minmax(220px,1fr)_150px_120px_170px_50px]
items-center
gap-6
py-6
border-b
border-[#F0F0F0]
`;

const IMAGE_WRAPPER_CLASS = `
w-24
h-24
bg-[#F9F1E7]
rounded-xl
flex
items-center
justify-center
overflow-hidden
`;

const QUANTITY_INPUT_CLASS = `
cart-quantity
w-[72px]
h-12
border
border-[#D9D9D9]
rounded-md
text-center
outline-none
transition-all
duration-300
focus:border-[#B88E2F]
focus:ring-2
focus:ring-[#B88E2F]/20
`;

const REMOVE_BUTTON_CLASS = `
remove-cart-item
group
flex
items-center
justify-center
text-[#B88E2F]
hover:text-red-500
transition-all
duration-300
cursor-pointer
`;

export function CartRow({
    id,
    image,
    name,
    price,
    quantity,
    size = "",
    color = "",
}) {
    const safeQuantity = Number.isFinite(quantity) && quantity > 0 ? quantity : 1;
    const safePrice = Number.isFinite(price) ? price : 0;
    const subtotal = safePrice * safeQuantity;

    return `
        <li
            class="${ROW_CLASS}"
            data-product-id="${id}"
            data-size="${size}"
            data-color="${color}">

            <div class="${IMAGE_WRAPPER_CLASS}">
                <img
                    src="${image}"
                    alt="${name}"
                    class="w-full h-full object-contain"
                    loading="lazy">
            </div>

            <h3
                class="text-[#3A3A3A] font-medium leading-6 line-clamp-2">
                ${name}
            </h3>

            <p class="text-[#9F9F9F]">
                ${formatPrice(safePrice)}
            </p>

            <input
                type="number"
                min="1"
                step="1"
                inputmode="numeric"
                value="${quantity}"
                class="${QUANTITY_INPUT_CLASS}"
                data-product-id="${id}"
                data-size="${size}"
                data-color="${color}"
                aria-label="Quantity for ${name}"
            >

            <p class="font-medium text-[#3A3A3A]">
                ${formatPrice(subtotal)}
            </p>

            <button
                type="button"
                class="${REMOVE_BUTTON_CLASS}"
                data-product-id="${id}"
                data-size="${size}"
                data-color="${color}"
                aria-label="Remove ${name} from cart"
                title="Remove product">
                
                <i class="fa-solid fa-trash transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                ></i>
            </button>

        </li>
    `
}