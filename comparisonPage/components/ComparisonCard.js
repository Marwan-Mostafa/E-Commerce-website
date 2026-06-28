const generateStars = (rating)=>{
    return Array(5).fill(0).map((_, index)=>{
        const starNumber = index + 1

        if(starNumber <= Math.floor(rating)){
            return `<i class="fa-solid fa-star text-[#B88E2F] text-sm"></i>`
        }
        else if (starNumber === Math.ceil(rating) && rating % 1 !== 0){
            return `<i class="fa-solid fa-star-half-stroke text-[#B88E2F] text-sm"></i>`
        }
         else {
            return `<i class="fa-regular fa-star text-[#B88E2F] text-sm"></i>`
         }
    }).join("")
}



const formatPrice = (price)=>{
    const formatted = new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price)

    return `Rs. ${formatted}`
}

export const comparisonCard = (product) =>{
    const { id, name, price, rating, reviews, image } = product;

  return `
    <div class="comparison-card flex flex-col gap-3" data-product-id="${id}">
      <div class="relative w-full aspect-square rounded-[10px] overflow-hidden bg-[#F9F1E7]">
        <img
          src="${image}"
          alt="${name}"
          class="w-full h-full object-cover"
          loading="lazy"/>
      </div>


      <div class="flex flex-col gap-1">
        <h3 class="font-semibold text-[16px] text-gray-900 leading-tight">
          ${name}
        </h3>
        <p class="text-[#B88E2F] font-medium text-[14px]">
          ${formatPrice(price)}
        </p>
        <div class="flex items-center gap-2 mt-1">
          <div class="flex items-center gap-0.5">
            ${generateStars(rating)}
          </div>
          <span class="text-gray-400 text-[12px]">
            ${reviews} Review${reviews !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  `
}