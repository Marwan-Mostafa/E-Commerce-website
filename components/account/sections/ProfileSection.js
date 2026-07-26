import { AccountProfileCard } from "../AccountProfileCard.js";
import { AccountInfo } from "../AccountInfo.js";

const WRAPPER_CLASS = `
flex
flex-col
gap-8
`;

const HEADING_CLASS = `
sr-only
`;


export function ProfileSection({
    profileData = {},
    accountData = {},
} = {}) {

    return `

        <section
            class="${WRAPPER_CLASS}"
            aria-labelledby="profile-section-title">

            <h2
                id="profile-section-title"
                class="${HEADING_CLASS}">

                Profile Information

            </h2>

            ${AccountProfileCard(profileData)}

            ${AccountInfo(accountData)}

        </section>

    `;

}