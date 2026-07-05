const SPEC_LABELS = {
    //GENERAL
    salesPackage: "Sales Package",
    modelNumber: "Model Number",
    secondaryMaterial: "Secondary Material",
    configuration: "Configuration",
    upholsteryMaterial: "Upholstery Material",
    upholsteryColor: "Upholstery Color",

    //PRODUCT

    fillingMaterial: "Filling Material",
    finishType: "Finish Type",
    adjustableHeadrest: "Adjustable Headrest",
    maximumLoadCapacity: "Maximum Load Capacity",
    originOfManufacture: "Origin of Manufacture",

    //DIMENSIONS

    width: "Width",
    height: "Height",
    depth: "Depth",
    weight: "Weight",
    seatHeight: "Seat Height",
    legHeight: "Leg Height",

    //WARRANTY

    warrantySummary: "Warranty Summary",
    warrantyServiceType: "Warranty Service Type",
    coveredInWarranty: "Covered in Warranty",
    notCoveredInWarranty: "Not Covered in Warranty",
    domesticWarranty: "Domestic Warranty",
}


const SPEC_GROUPS = [
    { key: 'general', label: 'General' },
    { key: 'product', label: 'Product' },
    { key: 'dimensions', label: 'Dimensions' },
    { key: 'warranty', label: 'Warranty' },
]



// Best Function in the file

const formatFallbackLabel = (key) => {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (char) => char.toUpperCase());
}



const getLabel = (key) => {
    return SPEC_LABELS[key] || formatFallbackLabel(key);
};



const renderGroupHeader = (label) => {
    return `
    <div class = "col-span-3 pt-8 pb-5 border-b border-gray-200">
        <h1 class="font-semibold text-[35px] text-gray-900">${label}</h1>
    </div>`
}



const renderRow = (fieldKey, groupKey, products) => {
    const label = getLabel(fieldKey)

    const values = products.map((product) => {
        const value = product?.specs?.[groupKey]?.[fieldKey] ?? '—'
        return `<div class="text-center py-4 px-4 text-md text-gray-600 border-b border-gray-100 leading-relaxed">
            ${value}
        </div>`
    }).join('')

    const emptyColumn = products.length < 2
        ? `<div class="py-4 px-4 border-b border-gray-100"></div>`
        : ''
    return `
            <div class="py-4 px-2 text-lg font-medium text-gray-700 border-b border-gray-100 leading-relaxed">
            ${label}
            </div>
            ${values}
            ${emptyColumn}`

}

const renderCartRow = (products) => {
    const buttons = products.map((product) => `
        <div class="pt-5 pb-5 px-4 text-center">
        <button type="button"
            class="add-to-cart-btn w-80 px-6 py-3 bg-[#B88E2F] text-white
            text-md font-medium rounded-[4px] hover:bg-[#a07828]
            transition-colors duration-200 focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-[#B88E2F]
            focus-visible:ring-offset-2 cursor-pointer" data-product-id="${product.id}">
            Add To Cart
        </button>
        </div>
    `).join('')

    const emptyColumn = products.length < 2
        ? `<div class="pt-6 pb-2 px-4"></div>`
        : ''



    return `
        <div class="pt-6 pb-2 px-2"></div>
        ${buttons}
        ${emptyColumn}
    `
}




export const ComparisonTable = ({ products }) => {

    if (!products || products.length === 0) return ''

    const primaryProduct = products[0]

    const groupsHTML = SPEC_GROUPS.map((group) => {

        const specGroup = primaryProduct?.specs?.[group.key]

        if (!specGroup) return ''

        const fieldKeys = Object.keys(specGroup)

        const headerHTML = renderGroupHeader(group.label)

        const rowsHTML = fieldKeys.map((fieldKey) =>
            renderRow(fieldKey, group.key, products)).join('')

        return headerHTML + rowsHTML;

    }).join('')

    const cartRowHTML = renderCartRow(products)

    return `<div class="w-full mt-10">
            <div class="grid grid-cols-[180px_1fr_1fr] items-start w-full">
                    ${groupsHTML}
                    ${cartRowHTML}
            </div>
        </div>`
}
