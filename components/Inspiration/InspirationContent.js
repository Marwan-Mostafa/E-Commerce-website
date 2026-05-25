export function InspirationContent(){
    const div = document.createElement("div")
    div.className = "inspiration-content flex-shrink-0 max-w-xs"

    div.innerHTML = `
    <h2 class="text-3xl font-bold text-[#3A3A3A] leading-tight mb-4">
        50+ Beautiful rooms <br>inspiration
    </h2>
    
    <p class="text-sm text-[#9F9F9F] mb-8">
      Our designer already made a lot of beautiful prototipe 
      of rooms that inspire you
    </p>

    <a href="./pages/shop.html"
       class="inline-block bg-[#B88E2F] text-white px-8 py-3 text-sm hover:bg-[#A07828] transition-colors">
      Explore More
    </a>
    `

    return div
}