const showItems = document.getElementById("showItems")
const sortItems = document.getElementById("sortItems");

showItems.addEventListener("change", ()=>{
    const limit = e.target.value
    console.log(`Show limit ${limit} products`)
})

sortItems.addEventListener("change", (e) => {
    const sortType = e.target.value;
    console.log(`Sort by ${sortType}`);
});