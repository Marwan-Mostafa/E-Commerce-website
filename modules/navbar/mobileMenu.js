export function initMobileMenu() {
    const toggleButton = document.getElementById('mobile-menu-toggle');
    const panel = document.getElementById('mobile-menu-panel');

    if (!toggleButton || !panel) return;

    const openMenu = () => {
        panel.classList.remove('-translate-x-full');
        panel.removeAttribute('inert');
        toggleButton.setAttribute('aria-expanded', 'true');
        toggleButton.setAttribute('aria-label', 'Close menu');
        toggleButton.querySelector('i').className = 'fa-solid fa-xmark text-xl';
        panel.querySelector('a')?.focus();
    };

    const closeMenu = () => {
        panel.classList.add('-translate-x-full');
        panel.setAttribute('inert', '');
        toggleButton.setAttribute('aria-expanded', 'false');
        toggleButton.setAttribute('aria-label', 'Open menu');
        toggleButton.querySelector('i').className = 'fa-solid fa-bars text-xl';
        toggleButton.focus();
    };

    const isOpen = () => toggleButton.getAttribute('aria-expanded') === 'true';

    toggleButton.addEventListener('click', () => {
        isOpen() ? closeMenu() : openMenu();
    });

    panel.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') closeMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isOpen()) closeMenu();
    });

    const desktopBreakpoint = window.matchMedia('(min-width: 768px)');
    desktopBreakpoint.addEventListener('change', (event) => {
        if (event.matches && isOpen()) closeMenu();
    });
}