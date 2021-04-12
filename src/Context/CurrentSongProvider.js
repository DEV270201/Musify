import React,{createContext,useEffect,useState} from "react";
import Data from "../musicData/Data";

export const CurrentSongContext = createContext("");

export const CurrentSongProvider = (props)=>{
   const[currentSong,setCurrentSong] = useState(Data[0]);

   useEffect(()=>{
      console.log("Music context mounted");
      Data[0].index = 0;                             //since the first music doesn't have the index property so by using effect we are assigning index to it...else while doing next-previous we will get an error of undefined
      setCurrentSong(Data[0]);
   },[]);

   const play_new_song = (song,index)=>{
      // console.log("called   " , song);
      if(!song.hasOwnProperty(index)){   //setting the index property to the object if it doesn't have
         song.index = index;
      }
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

