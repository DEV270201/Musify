import React,{createContext,useState} from "react";
import Data from "../musicData/Data";

export const CurrentSongContext = createContext("");

export const CurrentSongProvider = (props)=>{
   const[currentSong,setCurrentSong] = useState(Data[0]);

   const play_new_song = (song)=>{
      setCurrentSong(song);
   }

   return(
       <>
       <CurrentSongContext.Provider value={{currentSong,play_new_song}}>
          {
              props.children
          }
       </CurrentSongContext.Provider>
       </>
   );
}

