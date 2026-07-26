const DEFAULT_SECTION = "profile";

const VALID_SECTIONS = Object.freeze(
    new Set([
        "profile",
        "orders",
        "wishlist",
        "addresses",
    ])
);

let activeSection = DEFAULT_SECTION;

const listeners = new Set();

export function getState() {
    return {
        activeSection,
    };
}

export function getActiveSection() {
    return activeSection;
}

export function setActiveSection(section) {

    const normalizedSection = normalizeSection(section);

    if (!normalizedSection) {
        return;
    }

    if (!VALID_SECTIONS.has(normalizedSection)) {
        console.warn(
            `[accountState] Unknown account section "${normalizedSection}".`
        );
        return;
    }

    if (normalizedSection === activeSection) {
        return;
    }

    activeSection = normalizedSection;

    notifyListeners();

}

export function reset() {

    if (activeSection === DEFAULT_SECTION) {
        return;
    }

    activeSection = DEFAULT_SECTION;

    notifyListeners();

}

export function subscribe(listener) {

    if (typeof listener !== "function") {
        return () => { };
    }

    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };

}

function normalizeSection(section) {

    if (typeof section !== "string") {
        return "";
    }

    return section
        .trim()
        .toLowerCase();

}

function notifyListeners() {

    const state = getState();

    listeners.forEach((listener) => {

        try {

            listener(state);

        } catch (error) {

            console.error(
                "[accountState] Listener threw an error.",
                error
            );

        }

    });

}