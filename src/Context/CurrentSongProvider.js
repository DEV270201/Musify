import React,{createContext,useReducer} from "react";
import CurrentSongReducer from "../Reducer/CurrentSongReducer";
import Data from "../musicData/Data";

export const CurrentSongContext = createContext("");

export const CurrentSongProvider = (props)=>{

   const[currentSong,dispatch1] = useReducer(CurrentSongReducer,Data[0],()=>{
      //assigning the index to the first song because it will be rendered across the component for the very first time
      Data[0]['index'] = 0;
      return Data[0];
   });

   // const play_new_song = (song,index)=>{
   //    // console.log("called   " , song);
   //    if(!song.hasOwnProperty(index)){   //setting the index property to the object if it doesn't have
   //       song.index = index;
   //    }
   //    setCurrentSong(song);

   return(
       <>
       <CurrentSongContext.Provider value={{currentSong,dispatch1}}>
          {
              props.children
          }
       </CurrentSongContext.Provider>
       </>
   );
}

