const STORAGE_KEY = "compareIds";

export function loadCompareIds() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        const ids = JSON.parse(data);
        return Array.isArray(ids) ? ids : [];
    } catch (error) {
        console.error("[compareStorage] Failed to load compare ids.", error);
        return [];
    }
}


export function saveCompareIds(compareIds) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(compareIds));
    } catch (error) {
        console.error("[compareStorage] Failed to save compare ids.", error);
        throw error;
    }
}

export function clearCompareStorage() {
    localStorage.removeItem(STORAGE_KEY);
}