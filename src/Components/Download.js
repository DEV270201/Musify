import React,{useState,useContext} from "react";
import "../Css/Download.css";
import Data from "../musicData/Data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload} from '@fortawesome/free-solid-svg-icons';
import {faFrownOpen} from "@fortawesome/free-regular-svg-icons";
import {ThemeContext} from "../Context/ThemeContextProvider";
import ShowDownloadDetails from "./ShowDownloadDetails";
// import {CurrentSongContext} from "../Context/CurrentSongProvider";

const Download = ()=>{
    const {theme} = useContext(ThemeContext);
    const[musicSearch,setMusicSearch] = useState("");

    
    const SearchMusic = (event)=>{
        setMusicSearch(event.target.value);
    }

    const results = !musicSearch ? Data 
                                 : Data.filter((song,index)=>{    //if search is empty display all records else display the records that satisfy the condition
               return song.name.toLowerCase().includes(musicSearch.toLowerCase());
           });

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
        results.length ? (
            <>
              <ShowDownloadDetails results = {results} />
            </>
        ) : (
            <>
            <h3 className="download_msg" style={{color : `${theme.color}`}}><FontAwesomeIcon icon={faFrownOpen}/>     Sorry , song not found!!</h3>
            </>
        )
       }
       </>
   );
}

export default Download;