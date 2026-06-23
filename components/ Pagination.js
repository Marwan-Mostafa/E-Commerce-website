export function Pagination(totalPages, currentPage){
  let buttons = ""

  for(let page = 1; page <= totalPages; page++){
    buttons += `
    <li>
      <button data-page="${page}" class = "w-14 h-14 rounded-lg transition
        ${(currentPage === page)? "bg-[#B88E2F] text-white": "bg-[#F9F1E7] text-black hover:bg-[#B88E2F] hover:text-white"}">
          ${page}
      </button>  
    </li>`
  }
  buttons += `
    <li>
      <button
        data-next
        class="
          px-8 h-14 rounded-lg
          bg-[#F9F1E7]
          hover:bg-[#B88E2F]
          hover:text-white
          transition
        "
      >
        Next
      </button>
    </li>
  `

  return `<nav class="mt-10" aria-label="Pagination">
    <ul class="flex items-center justify-center gap-4">${buttons}</ul>  
  </nav>`
}