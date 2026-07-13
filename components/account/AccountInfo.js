const CARD_CLASS = `
bg-white
rounded-[20px]
border
border-[#F2F2F2]
shadow-sm
p-10
`

const TITLE_CLASS = `
text-[28px]
font-semibold
text-[#3A3A3A]
mb-8
`

const GRID_CLASS = `
grid
grid-cols-1
md:grid-cols-2
gap-x-12
gap-y-8
`

const ITEM_CLASS = `
flex
flex-col
gap-2
`

const LABEL_CLASS = `
text-[14px]
font-medium
uppercase
tracking-wide
text-[#9F9F9F]
`

const VALUE_CLASS = `
text-[18px]
font-medium
text-[#3A3A3A]
break-words
`

function AccountField({ label, value, }) {

    return `

        <div class="${ITEM_CLASS}">
            <span class="${LABEL_CLASS}">
                ${label}
            </span>

            <span class="${VALUE_CLASS}">
                ${value || "-"}
            </span>

        </div>

    `

}

export function AccountInfo({

    fullName = "Guest User",
    email = "Not Provided",
    phone = "Not Provided",
    country = "Not Provided",
    city = "Not Provided",
    address = "Not Provided",

} = {}) {

    return `

        <section

            class="${CARD_CLASS}"

            aria-labelledby="account-information-title">

            <h2

                id="account-information-title"

                class="${TITLE_CLASS}">

                Account Information

            </h2>

            <div class="${GRID_CLASS}">

                ${AccountField({

        label: "Full Name",

        value: fullName,

    })}

                ${AccountField({

        label: "Email",

        value: email,

    })}

                ${AccountField({

        label: "Phone",

        value: phone,

    })}

                ${AccountField({

        label: "Country",

        value: country,

    })}

                ${AccountField({

        label: "City",

        value: city,

    })}

                ${AccountField({

        label: "Address",

        value: address,

    })}

            </div>

        </section>

    `;

}