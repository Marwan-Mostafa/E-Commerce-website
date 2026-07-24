const NAV_LINKS = Object.freeze([
  { id: "home", label: "Home", href: "../../pages/home/home.html" },
  { id: "shop", label: "Shop", href: "../../pages/shop/shop.html" },
  { id: "blog", label: "Blogs", href: "../../pages/blog/blog.html" },
  { id: "contact", label: "Contact", href: "../../pages/contact/contact.html" },
]);

const ICON_LINKS = Object.freeze([
  {
    id: "account",
    label: "Account",
    icon: "fa-solid fa-user",
    href: "../../pages/account/account.html",
  },
  {
    id: "wishlist",
    label: "Wishlist",
    icon: "fa-regular fa-heart",
    href: "../../pages/wishlist/wishlist.html",
    badgeId: "wishlist-count",
  },
  {
    id: "cart",
    label: "Cart",
    icon: "fa-solid fa-cart-shopping",
    href: "../../pages/cart/cart.html",
    action: true,
    badgeId: "cart-badge",
  },
]);


function trimClassList(classList) {
  return classList
    .split(/\s+/)
    .filter(Boolean)
    .join(" ");
}


const activeTextClass = (isActive) =>
  isActive ? "text-(--primary)" : "text-gray-700 hover:text-black";


const navLinkClass = (isActive) => `
  relative
  group
  text-[16px]
  font-medium
  capitalize
  transition
  duration-300
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-(--primary)
  focus-visible:rounded-sm
  ${activeTextClass(isActive)}
`;

const iconLinkClasses = `
  relative
  flex
  items-center
  justify-center
  p-2
  rounded-full
  transition
  duration-300
  hover:bg-gray-200
  hover:scale-110
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-(--primary)
`;


function renderBadge(badgeId) {
  if (!badgeId) return "";

  return `
    <span
      id="${badgeId}"
      class="${trimClassList(`
        absolute
        -top-1
        -right-1
        hidden
        h-5
        w-5
        items-center
        justify-center
        rounded-full
        bg-red-500
        text-[11px]
        font-semibold
        text-white
      `)}">0</span>
  `;
}


function renderIconLink({ id, label, icon, href = "#", action, badgeId }, activePage) {
  const isActive = id === activePage;

  const stateClass = isActive ? "text-(--primary) bg-gray-100" : "";
  const linkClass = trimClassList(`${iconLinkClasses} ${stateClass}`);

  const content = action
    ? `
      <button
        type="button"
        id="${id}-trigger"
        aria-label="${label}"
        aria-haspopup="true"
        aria-expanded="false"
        title="${label}"
        class="${linkClass}">

        <i class="${icon}" aria-hidden="true"></i>
        ${renderBadge(badgeId)}
      </button>
    `
    : `
      
        <a href="${href}"
        aria-label="${label}"
        title="${label}"
        ${isActive ? 'aria-current="page"' : ""}
        class="${linkClass}">
        <i class="${icon}" aria-hidden="true"></i>
        ${renderBadge(badgeId)}
      </a>
    `;

  return `<li>${content}</li>`;
}


export function renderNavbar(activePage = "home") {

  function renderDesktopLinkItem({ id, label, href }) {
    const isActive = id === activePage;
    return `
      <li>
        
        <a href="${href}"
          class="${trimClassList(navLinkClass(isActive))}"
          ${isActive ? 'aria-current="page"' : ""}>
          
          ${label}
          <span
            class="${trimClassList(`
              absolute
              left-0
              -bottom-1
              h-0.5
              bg-current
              transition
              duration-300
              ${isActive ? "w-full" : "w-0 group-hover:w-full"}
            `)}"
            aria-hidden="true"
          ></span>
        </a>
      </li>
    `;
  }

  function renderMobileLinkItem({ id, label, href }) {
    const isActive = id === activePage;
    return `
      <li>
        
          <a href="${href}"
          class="${trimClassList(`
            block
            py-3
            text-lg
            font-medium
            capitalize
            transition
            ${activeTextClass(isActive)}
          `)}"
          ${isActive ? 'aria-current="page"' : ""}
        >
          ${label}
        </a>
      </li>
    `;
  }

  return `
    <header class="bg-white shadow-sm w-full h-[100px] flex items-center">
      <div class="mx-auto max-w-[1286px] w-full px-4 flex items-center justify-between">
        
        <a href="../../pages/home/home.html"
          class="flex items-center gap-2 transition hover:scale-105"
          aria-label="Furniro Home"
        >
          <img
            src="../../assets/images/logo.svg"
            alt="Furniro Logo"
            width="34"
            height="34"
          />
          <p class="font-bold md:text-[34px]">Furniro</p>
        </a>

        <nav aria-label="Main navigation">
          <ul class="hidden md:flex items-center gap-13">
            ${NAV_LINKS.map(renderDesktopLinkItem).join("")}
          </ul>
        </nav>

        <div class="flex items-center gap-4">
          <ul class="flex items-center gap-4 md:gap-8 text-xl">
            ${ICON_LINKS.map((item) => renderIconLink(item, activePage)).join("")}
          </ul>

          <button
            type="button"
            id="mobile-menu-toggle"
            class="md:hidden p-2 rounded-full transition hover:bg-gray-200"
            aria-label="Open menu"
            aria-expanded="false"
            aria-controls="mobile-menu-panel"
          >
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        tabindex="-1"
        class="
          md:hidden
          fixed
          top-[100px]
          right-0
          bottom-0
          left-0
          bg-white
          z-40
          transform
          -translate-y-full
          opacity-0
          transition
          duration-300
          ease-out
        "
        inert
      >
        <nav aria-label="Mobile navigation" class="px-6 py-6">
          <ul class="divide-y divide-gray-100">
            ${NAV_LINKS.map(renderMobileLinkItem).join("")}
          </ul>
        </nav>
      </div>
    </header>
  `;
}