export function setupTabs() {
    const tabsContainer = document.getElementById("tabs");

    if (!tabsContainer) return;

    const tabs = tabsContainer.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    tabsContainer.addEventListener("click", (e) => {
        const button = e.target.closest(".tab-btn");

        if (!button) return;

        const target = button.dataset.tab;

        tabs.forEach((tab) => {
            tab.classList.remove("active");
        });

        contents.forEach((content) => {
            content.classList.add("hidden");
        });

        button.classList.add("active");

        document
            .getElementById(`tab-${target}`)
            ?.classList.remove("hidden");
    });
}