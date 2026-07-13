export function renderNavbar(activePage = "home") {

  const navLinks = [
    {
      id: "home",
      label: "Home",
      href: "/pages/home/home.html",
    },

    {
      id: "shop",
      label: "Shop",
      href: "/pages/shop/shop.html",
    },

    {
      id: "blog",
      label: "About",
      href: "/pages/blog/blog.html",
    },

    {
      id: "contact",
      label: "Contact",
      href: "/pages/contact/contact.html",
    },

  ];

  const iconLinks = [

    {
      id: "account",
      label: "Account",
      icon: "fa-solid fa-user",
      href: "/pages/account/account.html",
    },

    {
      id: "wishlist",
      label: "Wishlist",
      icon: "fa-regular fa-heart",
      href: "/pages/wishlist/wishlist.html",
      badgeId: "wishlist-count",
    },

    {
      id: "cart",
      label: "Cart",
      icon: "fa-solid fa-cart-shopping",
      href: "/pages/cart/cart.html",
      action: true,
      badgeId: "cart-badge",
    },

  ];

  const activeTextClass = (isActive) =>

    isActive

      ? "text-(--primary)"

      : "text-gray-700 hover:text-black";

  const navLinkClass = (isActive) => `

        relative

        group

        text-[16px]

        font-medium

        capitalize

        transition

        duration-300

        focus-visible:outline-none

        focus-visible:ring-1

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

    if (!badgeId) {

      return "";

    }

    return `

            <span

                id="${badgeId}"

                class="

                    absolute

                    -top-1

                    -right-1

                    hidden

                    h-5

                    w-5

                    rounded-full

                    bg-red-500

                    text-[11px]

                    font-semibold

                    text-white

                    items-center

                    justify-center

                "

            >

                0

            </span>

        `;

  }

  function renderDesktopLink({

    id,

    label,

    href,

  }) {

    const isActive =

      id === activePage;

    return `

            <li>

                <a

                    href="${href}"

                    class="${navLinkClass(isActive)}"

                    ${isActive

        ? 'aria-current="page"'

        : ""

      }

                >

                    ${label}

                    <span

                        class="

                            absolute

                            left-0

                            -bottom-1

                            h-0.5

                            bg-current

                            transition-all

                            duration-300

                            ${isActive

        ? "w-full"

        : "w-0 group-hover:w-full"

      }

                        "

                        aria-hidden="true"

                    ></span>

                </a>

            </li>

        `;

  }

  function renderMobileLink({

    id,

    label,

    href,

  }) {

    const isActive =

      id === activePage;

    return `

            <li>

                <a

                    href="${href}"

                    class="

                        block

                        py-3

                        text-lg

                        font-medium

                        capitalize

                        transition

                        ${activeTextClass(isActive)}

                    "

                    ${isActive

        ? 'aria-current="page"'

        : ""

      }

                >

                    ${label}

                </a>

            </li>

        `;

  }

  function renderIconLink({

    id,

    label,

    icon,

    href,

    action,

    badgeId,

  }) {

    const content = action

      ? `

                <button

                    type="button"

                    id="${id}-trigger"

                    aria-label="${label}"

                    class="${iconLinkClasses}"

                >

                    <i

                        class="${icon}"

                        aria-hidden="true"

                    ></i>

                    ${renderBadge(badgeId)}

                </button>

            `

      : `

                <a

                    href="${href}"

                    aria-label="${label}"

                    class="${iconLinkClasses}"

                >

                    <i

                        class="${icon}"

                        aria-hidden="true"

                    ></i>

                    ${renderBadge(badgeId)}

                </a>

            `;

    return `

            <li>

                ${content}

            </li>

        `;

  }

  return `

<header class="bg-white shadow-sm w-full h-[100px] flex items-center">

<div class="mx-auto max-w-[1286px] w-full px-4 flex items-center justify-between">

<a

href="/pages/home/home.html"

class="flex items-center gap-2 transition hover:scale-105"

aria-label="Furniro Home"

>

<img

src="/assets/images/logo.svg"

alt="Furniro Logo"

width="34"

height="34"

/>

<p class="font-bold md:text-[34px]">

Furniro

</p>

</a>

<nav aria-label="Main navigation">

<ul class="hidden md:flex items-center gap-13">

${navLinks

      .map(renderDesktopLink)

      .join("")}

</ul>

</nav>

<div class="flex items-center gap-4">

<ul class="flex items-center gap-4 md:gap-8 text-xl">

${iconLinks

      .map(renderIconLink)

      .join("")}

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

class="

md:hidden
fixed
inset-0
top-[100px]
bg-white
z-40
transform
-translate-x-full
transition-transform
duration-300
ease-out
"

inert

>

<nav

aria-label="Mobile navigation"

class="px-6 py-6"

>

<ul class="divide-y divide-gray-100">

${navLinks

      .map(renderMobileLink)

      .join("")}

</ul>

</nav>

</div>

</header>

`;

}