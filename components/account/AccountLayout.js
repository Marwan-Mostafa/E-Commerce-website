import { AccountSidebar } from "./AccountSidebar.js";
import { AccountProfileCard } from "./AccountProfileCard.js";
import { AccountInfo } from "./AccountInfo.js";

const WRAPPER_CLASS = `
grid
grid-cols-1
lg:grid-cols-[320px_1fr]
gap-10
items-start
`

const CONTENT_CLASS = `
flex
flex-col
gap-8
`

export function AccountLayout({

    activeSection = "profile",

    profile = {},

    account = {},

} = {}) {

    return `

        <section
            class="${WRAPPER_CLASS}"
            aria-label="Account Dashboard">

            ${AccountSidebar({

        activeSection,

    })}

            <div
                class="${CONTENT_CLASS}">

                ${AccountProfileCard({

        ...profile,

    })}

                ${AccountInfo({

        ...account,

    })}

            </div>

        </section>

    `
}