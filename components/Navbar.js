export function renderNavbar(activePage = 'home') {
  const navLinks = [
    { id: 'home', label: 'Home', href: '/home.html' },
    { id: 'shop', label: 'Shop', href: '/pages/shop/shop.html' },
    { id: 'about', label: 'About', href: '/pages/about.html' },
    { id: 'contact', label: 'Contact', href: '/pages/contact.html' },
  ];

  const iconLinks = [
    { id: 'account', label: 'Account', icon: 'fa-solid fa-user', href: '/pages/account.html' },
    { id: 'wishlist', label: 'Wishlist', icon: 'fa-regular fa-heart', href: '/pages/wishlist.html' },
    { id: 'cart', label: 'Cart', icon: 'fa-solid fa-cart-shopping', href: '/pages/cart/cart.html' },
  ];

  const activeTextClass = (isActive) =>
    isActive ? 'text-(--primary)' : 'text-gray-700 hover:text-black';

  const navLinkClass = (isActive) => `
    relative group text-[16px] font-medium capitalize transition duration-300
    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--primary) focus-visible:rounded-sm
    ${activeTextClass(isActive)}
  `;

  const renderDesktopLink = ({ id, label, href }) => {
    const isActive = id === activePage;
    return `
      <li>
        <a href="${href}"
          class="${navLinkClass(isActive)}"
          ${isActive ? 'aria-current="page"' : ''}
        >
          ${label}
          <span
            class="absolute left-0 -bottom-1 h-0.5 bg-current transition-all duration-300
                   ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}"
            aria-hidden="true"
          ></span>
        </a>
      </li>
    `;
  };

  const renderMobileLink = ({ id, label, href }) => {
    const isActive = id === activePage;
    return `
      <li>
        <a href="${href}"
          class="block py-3 text-lg font-medium capitalize transition
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary) focus-visible:rounded-sm
                 ${activeTextClass(isActive)}"
          ${isActive ? 'aria-current="page"' : ''}
        >
          ${label}
        </a>
      </li>
    `;
  };

  const iconLinkClasses = `
    p-2 rounded-full transition duration-300 hover:bg-gray-200 hover:scale-110
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary)
  `;

  const renderIconLink = ({ id, label, icon, href, action }) => `
    <li>
      ${action
      ? `<button
             type="button"
             id="${id}-trigger"
             aria-label="${label}"
             class="${iconLinkClasses}"
           >
             <i class="${icon}" aria-hidden="true"></i>
           </button>`
      : `<a href="${href}"
             aria-label="${label}"
             class="${iconLinkClasses}"
           >
             <i class="${icon}" aria-hidden="true"></i>
           </a>`
    }
    </li>
  `;

  return `
    <header class="bg-white w-full h-[100px] flex items-center shadow-sm transition duration-300">
      <div class="mx-auto px-4 max-w-[1286px] w-full flex justify-between items-center">

        <a href="/home.html" class="flex items-center gap-2 hover:scale-105 transition duration-300" aria-label="Furniro — go to homepage">
          <img src="/assets/images/logo.svg" alt="" width="34" height="34" />
          <p class="font-bold md:text-[34px]">Furniro</p>
        </a>

        <nav aria-label="Main navigation">
          <ul class="hidden md:flex items-center gap-13 list-none">
            ${navLinks.map(renderDesktopLink).join('')}
          </ul>
        </nav>

        <div class="flex items-center gap-4">
          <ul class="flex list-none items-center gap-4 md:gap-8 text-xl">
            ${iconLinks.map(renderIconLink).join('')}
          </ul>

          <button
            type="button"
            id="mobile-menu-toggle"
            class="md:hidden p-2 rounded-full transition hover:bg-gray-200
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary)"
            aria-label="Open menu"
            aria-expanded="false"
            aria-controls="mobile-menu-panel"
          >
            <i class="fa-solid fa-bars text-xl" aria-hidden="true"></i>
          </button>
        </div>

      </div>

      <div
        id="mobile-menu-panel"
        class="md:hidden fixed inset-0 top-[100px] bg-white z-40
               transform -translate-x-full transition-transform duration-300 ease-out"
        inert
      >
        <nav aria-label="Mobile navigation" class="px-6 py-6">
          <ul class="list-none divide-y divide-gray-100">
            ${navLinks.map(renderMobileLink).join('')}
          </ul>
        </nav>
      </div>
    </header>
  `;
}