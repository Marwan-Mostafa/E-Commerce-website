export function InspirationCard(room) {
  const card = document.createElement("div")

  card.className = "flex-shrink-0 relative w-[404px]"

  card.innerHTML = `
  <img 
      src="${room.image}" 
      alt="${room.title}"
      class="h-[500px] object-cover"
    >
    
    <div class="absolute bottom-5 left-5 p-5 bg-white/90 backdrop-blur-sm">

      <p class="text-s text-[#9F9F9F] flex items-center gap-2">
        <span>${room.id}</span>
        <span class="w-4 h-px bg-[#9F9F9F] inline-block"></span>
        <span>${room.room}</span>
      </p>

      <h3 class="text-xl font-bold text-[#3A3A3A] mt-1">${room.title}</h3>
    </div>

    <button class="absolute bottom-5 left-48 w-10 h-10 bg-[#B88E2F] text-white flex items-center justify-center">
      →
    </button>`

    return card
}