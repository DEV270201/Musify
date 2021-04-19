import React,{useState,useContext} from "react";
import "../Css/Download.css";
import Data from "../musicData/Data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import DownloadDetails from "./DownloadDetails";
import {ThemeContext} from "../Context/ThemeContextProvider";
// import {CurrentSongContext} from "../Context/CurrentSongProvider";

const Download = ()=>{
    // const {play_new_song} = useContext(CurrentSongContext);
    // useEffect(()=>{
    //    play_new_song(Data[0]);
    // },[]);
    const {theme} = useContext(ThemeContext);
    const[musicSearch,setMusicSearch] = useState("");

    
    const SearchMusic = (event)=>{
        setMusicSearch(event.target.value);
    }

    return(
       <>
       <h2 className="down_head"><span id="a1"><FontAwesomeIcon icon={faDownload}/></span><span id="a2">Your Downloads...</span></h2>
       <br />
       <hr style={{backgroundColor:"black"}}/>
       <br />
       <div className="search_outer">
         <input type="text" className="music musicsearch" onChange={SearchMusic} value={musicSearch} name={musicSearch} placeholder="Search Songs..." style={{borderBottom : `2px solid ${theme.color}`}}/>
       </div>
       {
           Data.filter((song,index)=>{                                           //first we are filtering out the records that the user wants and then we are mapping it to display.
               return song.name.toLowerCase().includes(musicSearch.toLowerCase());
           }).map((song,index)=>{
            return(
                <div key={index}>
                   <DownloadDetails song={song} index={index} />
                </div>
            );  
           })
       }
       </>
   );
}

export default Download;