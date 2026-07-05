const STORAGE_KEY = "compareIds"
const MAX_COMPARE = 2

// Read
export const getCompareIds = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    } catch {
        return []
    }
}

// Save the data (Private)
const _save = (ids) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

// ADD
export const addProductToCompare = (id) => {
    const ids = getCompareIds()

    if (ids.includes(id) || ids.length >= MAX_COMPARE) {
        return { status: "open", count: ids.length }
    }

    const nextIds = [...ids, id]
    _save(nextIds)

    return {
        status: nextIds.length >= MAX_COMPARE ? "ready" : "added",
        count: nextIds.length,
    }
}

// Remove

export const removeCompareId = (id) => {
    const ids = getCompareIds();
    _save(ids.filter((existingId) => existingId !== id));
};


// Clear

export const clearCompare = () => {
    localStorage.removeItem(STORAGE_KEY)
}

// Check

export const isCompared = (id) => {
    return getCompareIds().includes(id)
}