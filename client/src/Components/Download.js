import React, { useState, useContext, useEffect } from "react";
import "../Css/Download.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import {faFrownOpen} from "@fortawesome/free-regular-svg-icons";
import {ThemeContext} from "../Context/ThemeContextProvider";
import ShowDownloadDetails from "./ShowDownloadDetails";
import { CurrentSongContext } from "../Context/CurrentSongProvider";

const Download = ()=>{
    const {theme} = useContext(ThemeContext);
    const { covers, currentSongAndLoad } = useContext(CurrentSongContext);
    const[musicSearch,setMusicSearch] = useState("");
    // const [music, setMusic] = useState([]);

    
    const SearchMusic = (event)=>{
        setMusicSearch(event.target.value);
    }



    const results = !musicSearch ? covers
        : covers.filter((song, index) => {    //if search is empty display all records else display the records that satisfy the condition
            return song.filename.slice(0, song.filename.indexOf('@')).toLowerCase().includes(musicSearch.toLowerCase());
           });

    return(
       <>
            <h2 className="down_head"><span id="a1"><FontAwesomeIcon icon={faMusic} /></span><span id="a2">Enjoy Guitar Covers...</span></h2>
       <br />
       <hr style={{backgroundColor:"black"}}/>
       <br />
       <div className="search_outer">
         <input type="text" className="music musicsearch" onChange={SearchMusic} value={musicSearch} name={musicSearch} placeholder="Search Songs..." style={{borderBottom : `2px solid ${theme.color}`}}/>
       </div>
       {
                currentSongAndLoad.load ?
                    <h3 className="download_msg" style={{ color: `${theme.color}` }}>Loading...Please Wait!!</h3>
                    :
                    (
        results.length !==0 ? (
            <>
                                <ShowDownloadDetails results={results} />
            </>
        ) : (
            <>
                                    <h3 className="download_msg" style={{ color: `${theme.color}` }}><FontAwesomeIcon icon={faFrownOpen} />  {musicSearch.trim() === "" ? "Something went wrong. Please try again later..." : " Sorry , cover not found!!"} </h3>
            </>
        )
                    )
       }
       </>
   );
}

export default Download;