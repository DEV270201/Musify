//THEME REDUCER
const dark = {
    backgroundColor : "black",
    color : "dodgerblue",
    theme : "dark",
}

const light = {
    backgroundColor : "#D1E8E2",
    color : "black",
    theme : "light",
}

const ThemeReducer =  (state,action)=>{
    switch(action.type){
        case "LIGHT THEME":
           return light;
        case "DARK THEME":
            return dark;
        default:
            return state;
    }
}

export default ThemeReducer;