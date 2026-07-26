const WRAPPER_CLASS = `
bg-white
rounded-[20px]
border
border-[#F2F2F2]
shadow-sm
p-8
`

const TITLE_CLASS = `
text-[24px]
font-semibold
text-[#3A3A3A]
mb-8
`

const NAV_CLASS = `
flex
flex-col
gap-3
`

const ITEM_CLASS = `
group
flex
items-center
gap-4

rounded-xl
cursor-pointer
px-4
py-4

text-[#6F6F6F]

transition-all
duration-300

hover:bg-[#FFF3E3]
hover:text-[#B88E2F]
`

const ACTIVE_ITEM_CLASS = `
bg-[#FFF3E3]
text-[#B88E2F]
font-semibold
`

const ICON_CLASS = `
w-5
text-center
text-[18px]
`

const MENU_ITEMS = [

    {
        id: "profile",
        label: "Profile",
        icon: "fa-regular fa-user",
    },

    {
        id: "orders",
        label: "Orders",
        icon: "fa-solid fa-box",
    },

    {
        id: "wishlist",
        label: "Wishlist",
        icon: "fa-regular fa-heart",
    },

    {
        id: "addresses",
        label: "Addresses",
        icon: "fa-solid fa-location-dot",
    },

    {
        id: "logout",
        label: "Logout",
        icon: "fa-solid fa-arrow-right-from-bracket",
    },

]

function renderItem(item, activeSection) {

    const isActive =
        item.id === activeSection;

    return `

        <button type="button"
            data-account-section="${item.id}"
            class="
                ${ITEM_CLASS}
                ${isActive ? ACTIVE_ITEM_CLASS : ""}">

            <i class="${item.icon} ${ICON_CLASS}"
                aria-hidden="true">
            </i>

            <span>${item.label}</span>
        </button>`

}

export function AccountSidebar({

    activeSection = "profile",

} = {}) {

    return `

        <aside class="${WRAPPER_CLASS}" aria-labelledby="account-navigation-title">

            <h2 id="account-navigation-title" class="${TITLE_CLASS}">
                My Account
            </h2>

            <nav class="${NAV_CLASS}" aria-label="Account Navigation">
                ${MENU_ITEMS.map(item => renderItem(item, activeSection)).join("")}

            </nav>

        </aside>`

}