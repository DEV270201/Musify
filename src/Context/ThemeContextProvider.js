import React,{createContext,useState} from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = (props)=>{
    const[theme,setTheme] = useState("");
    const[theme_status,setTheme_status] = useState("light");

    const changeTheme = (passedTheme)=>{
       if(theme === "light"){
        //    setTheme(passedTheme);
           setTheme_status(passedTheme);
       }else{
        setTheme_status(passedTheme);
       }
    }

    return(
        <>
        <ThemeContext.Provider value={{theme_status , changeTheme}}>
             {
                 props.children
             }
        </ThemeContext.Provider>
        </>
    );
}