// This is data of current card

let state = {
    currentIndex : 0,
    total: 0
}

// Function for Read Data and Copy new Object with spread Operator

export function getSliderState(){
    return {...state}
}

//  Function for Edit data


export function setSliderIndex(newIndex){
    state.currentIndex = newIndex
}

// Initialization function for cards

export function initSliderState(total){
    state.total = total
    state.currentIndex = 0
}