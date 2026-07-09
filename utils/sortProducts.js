export function sortProducts(products, sortBy = "default") {

    const sorted = [...products];

    switch (sortBy) {

        case "price":
            return sorted.sort((a, b) => a.price - b.price);

        case "name":
            return sorted.sort((a, b) =>
                a.name.localeCompare(b.name)
            );

        case "newest":
            return sorted.reverse();

        default:
            return sorted;
    }

}