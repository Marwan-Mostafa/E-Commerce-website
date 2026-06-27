const compareBtn = document.getElementById("compare-btn")

export function renderCompareBtn(){
    compareBtn.addEventListener("click", ()=>{
    window.location.href = "../pages/productComparison.html"
})
}