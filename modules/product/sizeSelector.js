import { productState } from "../../state/productState.js";

const ACTIVE_CLASSES = [
    "bg-[#B88E2F]",
    "border-[#B88E2F]",
    "text-white",
];

const INACTIVE_CLASSES = [
    "bg-white",
    "border-[#D9D9D9]",
    "text-[#3A3A3A]",
];

export function setupSizeSelector() {

    const buttons = document.querySelectorAll(".size-btn");

    if (!buttons.length) return;

    // أول Size يكون Selected
    const firstButton = buttons[0];

    productState.selectedSize = firstButton.dataset.size;

    firstButton.setAttribute("aria-pressed", "true");

    buttons.forEach((button) => {

        button.addEventListener("click", () => {

            productState.selectedSize = button.dataset.size;

            buttons.forEach((btn) => {

                btn.classList.remove(...ACTIVE_CLASSES);

                btn.classList.add(...INACTIVE_CLASSES);

                btn.setAttribute("aria-pressed", "false");

            });

            button.classList.remove(...INACTIVE_CLASSES);

            button.classList.add(...ACTIVE_CLASSES);

            button.setAttribute("aria-pressed", "true");

        });

    });

}