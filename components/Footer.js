const footerLinks = [
    { label: 'Home', href: '/pages/home/home.html' },
    { label: 'Shop', href: '/pages/shop/shop.html' },
    { label: 'About', href: '/pages/about/about.html' },
    { label: 'Contact', href: '/pages/contact/contact.html' },
];

const helpLinks = ['Payment Options', 'Returns', 'Privacy Policies'];

function renderLinkWithUnderline(label, href = '#') {
    return `
    <li>
      <a href="${href}" class="group relative inline-block text-[15px] text-gray-700
                                 hover:text-gray-900 transition-colors duration-300">
        ${label}
        <span class="absolute left-0 -bottom-1 h-[1.5px] w-0 bg-gray-900
                     transition-all duration-300 group-hover:w-full"></span>
      </a>
    </li>
  `;
}

export function renderFooter() {
    return `
    <footer class="w-full bg-white border-t border-gray-200 mt-20">
      <div class="max-w-[1286px] mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div class="grid gap-12 lg:grid-cols-[1.2fr_2fr] lg:gap-20">

          <div class="flex flex-col gap-6">
            <a href="/home.html" class="text-[26px] font-bold text-gray-900 w-fit
                                          hover:text-(--primary) transition-colors duration-300"
               aria-label="Furniro — go to homepage">
              Furniro.
            </a>
            <address class="not-italic text-sm text-gray-400 leading-loose">
              400 University Drive Suite 200<br />
              Coral Gables,<br />
              FL 33134 USA
            </address>
          </div>

          <div class="flex flex-col sm:flex-row flex-wrap gap-10 sm:gap-12 justify-between">
            <nav aria-label="Site links">
              <h3 class="text-sm font-semibold tracking-wide text-gray-400 mb-7">Links</h3>
              <ul class="flex flex-col gap-5 list-none p-0 m-0">
                ${footerLinks.map((link) => renderLinkWithUnderline(link.label, link.href)).join('')}
              </ul>
            </nav>

            <div>
              <h3 class="text-sm font-semibold tracking-wide text-gray-400 mb-7">Help</h3>
              <ul class="flex flex-col gap-5 list-none p-0 m-0">
                ${helpLinks.map((label) => renderLinkWithUnderline(label)).join('')}
              </ul>
            </div>

            <div class="min-w-[240px]">
              <h3 class="text-sm font-semibold text-gray-400 tracking-wide mb-7">Newsletter</h3>
              <form id="newsletter-form" novalidate class="flex flex-col gap-3">
                <div class="flex items-center border-b border-gray-800 pb-2
                            focus-within:border-(--primary) transition-colors duration-300">
                  <label for="newsletter-email" class="sr-only">Email address</label>
                  <input
                    type="email" id="newsletter-email" name="email" required
                    placeholder="Enter Your Email Address"
                    class="flex-1 min-w-0 bg-transparent border-none outline-none text-sm text-gray-800
                           placeholder:text-gray-400 placeholder:text-[13px] py-1"
                  />
                  <button type="submit" class="ml-4 shrink-0 text-xs font-bold tracking-[0.12em] uppercase
                                                text-gray-900 bg-transparent border-none whitespace-nowrap
                                                hover:text-(--primary) transition-colors duration-300
                                                focus-visible:outline-none focus-visible:text-(--primary)">
                    Subscribe
                  </button>
                </div>
                <p id="newsletter-msg" class="text-xs min-h-[1rem]" aria-live="polite"></p>
              </form>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-sm text-gray-500">2026 Furniro. All rights reserved.</p>
          <div class="flex items-center gap-6">
            <a href="#" aria-label="Furniro on Facebook" class="text-sm text-gray-400 hover:text-gray-900 transition-colors">Facebook</a>
            <a href="#" aria-label="Furniro on Instagram" class="text-sm text-gray-400 hover:text-gray-900 transition-colors">Instagram</a>
            <a href="#" aria-label="Furniro on Twitter" class="text-sm text-gray-400 hover:text-gray-900 transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}