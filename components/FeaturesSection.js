const features = [
    {
        title: "High Quality",
        description: "Crafted from top materials",
        icon: "/assets/images/firstIcon.svg",
        alt: "High quality icon",
    },
    {
        title: "Warranty Protection",
        description: "Over 2 years",
        icon: "/assets/images/secIcon.svg",
        alt: "Warranty protection icon",
    },
    {
        title: "Free Shipping",
        description: "Order over $150",
        icon: "/assets/images/thirdIcon.svg",
        alt: "Free shipping icon",
    },
    {
        title: "24 / 7 Support",
        description: "Dedicated support",
        icon: "/assets/images/fourIcon.svg",
        alt: "Customer support icon",
    },
];

function renderFeatureCard(feature) {
    return `
        <article
            class="flex items-center gap-4"
        >
            <img
                src="${feature.icon}"
                alt="${feature.alt}"
                loading="lazy"
                width="60"
                height="60"
            />

            <div>

                <h3
                    class="font-semibold text-xl lg:text-2xl text-gray-900"
                >
                    ${feature.title}
                </h3>

                <p
                    class="text-gray-500 font-medium mt-1"
                >
                    ${feature.description}
                </p>

            </div>

        </article>
    `;
}

export function renderFeaturesSection() {
    return `
        <section
            aria-labelledby="features-heading"
            class="bg-[#FAF3EA]"
        >

            <div
                class="max-w-[1286px]
                       mx-auto
                       px-6
                       py-12
                       lg:py-20"
            >

                <h2
                    id="features-heading"
                    class="sr-only"
                >
                    Store Features
                </h2>

                <div
                    class="grid
                           grid-cols-1
                           sm:grid-cols-2
                           xl:grid-cols-4
                           gap-10"
                >

                    ${features
            .map(renderFeatureCard)
            .join("")}

                </div>

            </div>

        </section>
    `;
}