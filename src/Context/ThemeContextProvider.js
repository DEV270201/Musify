import React,{createContext,useState} from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = (props)=>{
    return(
        <>
        <h1>Context</h1>
        </>
    );
}