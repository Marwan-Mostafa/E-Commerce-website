import {
    loadCompareIds,
    saveCompareIds,
    clearCompareStorage,
} from "./compareStorage.js";


// ======================================================
// Constants
// ======================================================

const MAX_COMPARE = 2;


// ======================================================
// State
// ======================================================

let compareIds = loadCompareIds();

const subscribers = new Set();


// ======================================================
// Internal Helpers
// ======================================================

function notifySubscribers() {

    const snapshot = [...compareIds];

    subscribers.forEach(listener => {

        listener(snapshot);

    });

}

function persist() {

    saveCompareIds(compareIds);

    notifySubscribers();

}

function isValidId(id) {

    return Number.isInteger(id) && id > 0;

}


// ======================================================
// Queries
// ======================================================

export function getCompareIds() {

    return [...compareIds];

}

export function getCount() {

    return compareIds.length;

}

export function isCompared(id) {

    return compareIds.includes(id);

}

export function hasCompare(id) {

    return isCompared(id);

}

export function isCompareEmpty() {

    return compareIds.length === 0;

}


// ======================================================
// Mutations
// ======================================================

export function addCompareId(id) {

    if (!isValidId(id)) {

        return {

            success: false,

            status: "invalid",

            count: getCount(),

        };

    }

    if (compareIds.includes(id)) {

        return {

            success: false,

            status: "exists",

            count: compareIds.length,

        };

    }

    if (compareIds.length >= MAX_COMPARE) {

        return {

            success: false,

            status: "full",

            count: compareIds.length,

        };

    }

    compareIds.push(id);

    persist();

    return {

        success: true,

        status:

            compareIds.length === MAX_COMPARE

                ? "ready"

                : "added",

        count: compareIds.length,

    };

}

export function replaceCompareId(oldId, newId) {

    if (!isValidId(newId)) {

        return false;

    }

    const index = compareIds.indexOf(oldId);

    if (index === -1) {

        return false;

    }

    if (compareIds.includes(newId)) {

        return false;

    }

    compareIds[index] = newId;

    persist();

    return true;

}

export function removeCompareId(id) {

    compareIds = compareIds.filter(

        compareId => compareId !== id

    );

    persist();

}

export function clearCompare() {

    compareIds = [];

    clearCompareStorage();

    notifySubscribers();

}

export function toggleCompare(id) {

    if (isCompared(id)) {

        removeCompareId(id);

        return false;

    }

    return addCompareId(id);

}


// ======================================================
// Subscriptions
// ======================================================

export function subscribeCompare(listener) {

    if (typeof listener !== "function") {

        return () => { };

    }

    subscribers.add(listener);

    return () => {

        subscribers.delete(listener);

    };

}


// ======================================================
// Exports
// ======================================================

export {

    MAX_COMPARE,

};