const WRAPPER_CLASS = `
flex
flex-wrap
items-center
gap-6
text-[14px]
text-[#9F9F9F]
`;

const ITEM_CLASS = `
flex
items-center
gap-2
`;

const ICON_CLASS = `
text-[13px]
text-[#9F9F9F]
`;

function MetaItem({
    icon,
    value,
}) {

    return `
        <div class="${ITEM_CLASS}">

            <i class="${icon} ${ICON_CLASS}"></i>

            <span>

                ${value}

            </span>

        </div>
    `;

}

export function BlogMeta({
    author,
    date,
    category,
}) {

    return `
        <div
            class="${WRAPPER_CLASS}"
            aria-label="Post information">

            ${MetaItem({

        icon: "fa-solid fa-user",

        value: author,

    })}

            ${MetaItem({

        icon: "fa-solid fa-calendar",

        value: date,

    })}

            ${MetaItem({

        icon: "fa-solid fa-tag",

        value: category,

    })}

        </div>
    `;

}