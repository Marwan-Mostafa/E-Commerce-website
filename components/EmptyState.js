export function renderEmptyState({
    title = "No Products Found",
    description = "Try changing your filters.",
} = {}) {

    return `
        <section
            class="w-full py-24 flex flex-col items-center justify-center">

            <h2 class="text-3xl font-bold text-gray-800">
                ${title}
            </h2>

            <p class="mt-3 text-gray-500">
                ${description}
            </p>

        </section>
    `;

}