import React,{createContext,useState} from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = (props)=>{
    const dark = {
        backgroundColor : "black",
        color : "dodgerblue",
    }

    const light = {
        backgroundColor : "#D1E8E2",
        color : "black",
    }

    const[theme,setTheme] = useState(light);
    const[theme_status,setTheme_status] = useState("light");

    const changeTheme = (passedTheme)=>{
       if(theme_status === "light"){
        //    setTheme(passedTheme);
           setTheme_status(passedTheme);
           setTheme(dark);
       }else{
        setTheme_status(passedTheme);
        setTheme(light);
       }
    }

    return(
        <>
        <ThemeContext.Provider value={{theme_status , changeTheme , theme}}>
             {
                 props.children
             }
        </ThemeContext.Provider>
        </>
    );
}