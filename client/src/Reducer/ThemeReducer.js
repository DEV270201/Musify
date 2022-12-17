//THEME REDUCER
const dark = {
    backgroundColor : "black",
    color: "#003297",
    theme : "dark",
}

const light = {
    backgroundColor : "#D1E8E2",
    color : "black",
    theme : "light",
}

const ThemeReducer =  (state,action)=>{
    switch(action.type){
        case "LIGHT_THEME":
           return light;
        case "DARK_THEME":
            return dark;
        default:
            return state;
    }
}

export default ThemeReducer;