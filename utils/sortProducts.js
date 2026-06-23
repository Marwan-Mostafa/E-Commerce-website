export function sortProducts(products, sortBy){
    switch(sortBy){
        case 'price':
            return [...products].sort((a, b)=> a.price - b.price)
        case 'name':
            return [...products].sort((a, b)=>{
                a.name.localeCompare(b.name)
            })
        case "newest":
            return [...products].reverse()
        default:
            return products;
    }
}