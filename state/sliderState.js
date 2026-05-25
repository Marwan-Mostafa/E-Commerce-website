let state = {
    currentIndex : 0,
    total: 0
}

function getSliderState(){
    return {...state}
}

function setSliderIndex(newIndex){
    state.currentIndex = newIndex
}

function initSliderState(total){
    state.total = total
    state.currentIndex = 0
}