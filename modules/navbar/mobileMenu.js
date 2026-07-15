const DESKTOP_BREAKPOINT_QUERY = "(min-width: 768px)";
const OPEN_CLASSES = ["translate-y-0", "opacity-100"];
const CLOSED_CLASSES = ["-translate-y-full", "opacity-0"];

export function initMobileMenu(root = document) {
    const toggleButton = root.querySelector("#mobile-menu-toggle");
    const panel = root.querySelector("#mobile-menu-panel");

    if (!toggleButton || !panel) {
        return;
    }

    if (toggleButton.dataset.mobileMenuBound === "true") {
        return;
    }

    toggleButton.dataset.mobileMenuBound = "true";

    const icon = toggleButton.querySelector("i");
    const desktopBreakpoint = window.matchMedia(DESKTOP_BREAKPOINT_QUERY);
    function isOpen() {
        return toggleButton.getAttribute("aria-expanded") === "true";
    }
    function openMenu() {
        panel.classList.remove(...CLOSED_CLASSES);
        panel.classList.add(...OPEN_CLASSES);
        panel.removeAttribute("inert");

        toggleButton.setAttribute("aria-expanded", "true");
        toggleButton.setAttribute("aria-label", "Close menu");

        if (icon) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        }

        document.body.classList.add("overflow-hidden");

        const firstLink = panel.querySelector("a");
        (firstLink || panel).focus();
    }

    function closeMenu({ returnFocus = true } = {}) {
        panel.classList.remove(...OPEN_CLASSES);
        panel.classList.add(...CLOSED_CLASSES);
        panel.setAttribute("inert", "");

        toggleButton.setAttribute("aria-expanded", "false");
        toggleButton.setAttribute("aria-label", "Open menu");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

        document.body.classList.remove("overflow-hidden");

        if (returnFocus) {
            toggleButton.focus();
        }
    }

    function toggleMenu() {
        if (isOpen()) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    toggleButton.addEventListener("click", toggleMenu);

    panel.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            closeMenu({ returnFocus: false });
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && isOpen()) {
            closeMenu();
        }
    });

    desktopBreakpoint.addEventListener("change", (event) => {
        if (event.matches && isOpen()) {
            closeMenu({ returnFocus: false });
        }
    });
}