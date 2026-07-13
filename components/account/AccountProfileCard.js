const CARD_CLASS = `
bg-white
rounded-[20px]
border
border-[#F2F2F2]
shadow-sm
p-10
`;

const CONTENT_CLASS = `
flex
flex-col
items-center
text-center
`;

const AVATAR_WRAPPER_CLASS = `
w-32
h-32

rounded-full

bg-[#FFF3E3]

flex
items-center
justify-center

mb-6

overflow-hidden
`;

const AVATAR_IMAGE_CLASS = `
w-full
h-full
object-cover
`;

const PLACEHOLDER_ICON_CLASS = `
fa-regular
fa-user

text-[52px]

text-[#B88E2F]
`;

const NAME_CLASS = `
text-[28px]
font-semibold
text-[#3A3A3A]
`;

const ROLE_CLASS = `
mt-2

text-[#9F9F9F]

text-[16px]
`;

const MEMBER_CLASS = `
mt-6

inline-flex
items-center

gap-2

rounded-full

bg-[#FFF3E3]

px-5
py-2

text-[#B88E2F]

font-medium
text-[14px]
`;

export function AccountProfileCard({

    name = "Guest User",

    role = "Customer",

    memberSince = "2026",

    avatar = "",

} = {}) {

    return `

        <section
            class="${CARD_CLASS}"
            aria-labelledby="profile-card-title">

            <div
                class="${CONTENT_CLASS}">

                <div
                    class="${AVATAR_WRAPPER_CLASS}">

                    ${avatar

            ? `<img src="${avatar}"
                alt="${name}"
                class="${AVATAR_IMAGE_CLASS}">

                        `: `<i class="${PLACEHOLDER_ICON_CLASS}" aria-hidden="true"></i>`}
                </div>

                <h2 id="profile-card-title" class="${NAME_CLASS}">
                    ${name}
                </h2>

                <p class="${ROLE_CLASS}">
                    ${role}
                </p>

                <div class="${MEMBER_CLASS}">

                    <i class="fa-regular fa-calendar" aria-hidden="true">
                    </i>

                    <span>
                        Member since ${memberSince}
                    </span>

                </div>

            </div>

        </section>

    `;

}