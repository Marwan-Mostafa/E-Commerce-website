import { ContactInfoCard } from "./ContactInfoCard.js";

const WRAPPER_CLASS = `
w-full
flex
flex-col
gap-14
`;

const DEFAULT_CONTACT_ITEMS = [

    {
        id: "address",
        icon: "fa-solid fa-location-dot",
        title: "Address",
        semantic: "address",
        lines: [
            "236 5th SE Avenue,",
            "New York NY10000,",
            "United States",
        ],
    },

    {
        id: "phone",
        icon: "fa-solid fa-phone",
        title: "Phone",
        lines: [
            "Mobile: +(84) 546-6789",
            "Hotline: +(84) 456-6789",
        ],
    },

    {
        id: "working-time",
        icon: "fa-solid fa-clock",
        title: "Working Time",
        lines: [
            "Monday–Friday: 9:00 - 22:00",
            "Saturday–Sunday: 9:00 - 21:00",
        ],
    },

];

function renderCard(item) {

    return ContactInfoCard({

        id: item.id,

        icon: item.icon,

        title: item.title,

        semantic: item.semantic,

        lines: item.lines,

    });

}

export function ContactInfo(
    items = DEFAULT_CONTACT_ITEMS
) {

    const safeItems = Array.isArray(items)
        ? items
        : [];

    const cards = safeItems
        .map(renderCard)
        .join("");

    return `
<section
    class="${WRAPPER_CLASS}"
    aria-labelledby="contact-information-title">

    <h2
        id="contact-information-title"
        class="sr-only">

        Contact Information

    </h2>

    ${cards}

</section>
`.trim();

}