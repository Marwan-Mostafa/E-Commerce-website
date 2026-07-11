import { CartRow } from './CartRow.js'

export function CartRows(items = []) {
    if (!Array.isArray(items) || items.length === 0) {
        return ""
    }

    return items
        .map((item) => CartRow(item))
        .join("")
}