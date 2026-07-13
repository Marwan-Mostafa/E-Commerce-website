const STORAGE_KEY = "compareIds";
const MAX_COMPARE = 2;

const saveCompareIds = (ids) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
};

const isValidId = (id) => Number.isInteger(id) && id > 0;


export const getCompareIds = () => {
    try {
        const ids = JSON.parse(localStorage.getItem(STORAGE_KEY));

        return Array.isArray(ids) ? ids : [];
    } catch {
        return [];
    }
};

export const getCount = () => {
    return getCompareIds().length;
};

export const addCompareId = (id) => {
    if (!isValidId(id)) {
        return {
            success: false,
            status: "invalid",
            count: getCount(),
        };
    }

    const ids = getCompareIds();

    if (ids.includes(id)) {
        return {
            success: false,
            status: "exists",
            count: ids.length,
        };
    }

    if (ids.length >= MAX_COMPARE) {
        return {
            success: false,
            status: "full",
            count: ids.length,
        };
    }

    const nextIds = [...ids, id];

    saveCompareIds(nextIds);

    return {
        success: true,
        status: nextIds.length === MAX_COMPARE ? "ready" : "added",
        count: nextIds.length,
    };
};

export const replaceCompareId = (oldId, newId) => {
    if (!isValidId(newId)) {
        return false;
    }

    const ids = getCompareIds();

    const index = ids.indexOf(oldId);

    if (index === -1) {
        return false;
    }

    if (ids.includes(newId)) {
        return false;
    }

    ids[index] = newId;

    saveCompareIds(ids);

    return true;
};

export const removeCompareId = (id) => {
    const ids = getCompareIds();

    saveCompareIds(
        ids.filter((compareId) => compareId !== id)
    );
};

export const clearCompare = () => {
    localStorage.removeItem(STORAGE_KEY);
};


export const isCompared = (id) => {
    return getCompareIds().includes(id);
};

export { MAX_COMPARE };