import React,{createContext,useReducer} from "react";
import ThemeReducer from "../Reducer/ThemeReducer";

export const ThemeContext = createContext();

export const ThemeContextProvider = (props)=>{
    const light = {
        backgroundColor : "#D1E8E2",
        color : "black",
        theme : "light",
    }

    const[theme,dispatch] = useReducer(ThemeReducer,light);
    // const[theme_status,setTheme_status] = useState("light");

    // const changeTheme = (passedTheme)=>{
    //    if(theme_status === "light"){
    //     //    setTheme(passedTheme);
    //        setTheme_status(passedTheme);
    //        setTheme(dark);
    //    }else{
    //     setTheme_status(passedTheme);
    //     setTheme(light);
    //    }
    // }

    return(
        <>
        <ThemeContext.Provider value={{theme,dispatch}}>
             {
                 props.children
             }
        </ThemeContext.Provider>
        </>
    );
}