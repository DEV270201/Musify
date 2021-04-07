import React,{createContext,useEffect,useReducer} from "react";

export const FavouriteContext = createContext();

const FavouriteContextProvider = (props)=>{

    // const[favSongs,dispatch] = useReducer(fav_reducer,[],()=>{
    //     let resultData = localStorage.getItem("favSongs");
    //     return resultData ? JSON.parse(favSongs) : [];
    // });
    // useEffect(()=>{

    // },[favSongs]);
    return(
        <>
        <FavouriteContext.Provider values={{favSongs,dispatch}}>
            { props.children }
        </FavouriteContext.Provider>
        </>
    );
}

export default FavouriteContextProvider;

