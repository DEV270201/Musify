import React from "react";
import "../Css/Download.css";
import Data from "../musicData/Data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import DownloadDetails from "./DownloadDetails";
// import {CurrentSongContext} from "../Context/CurrentSongProvider";

const Download = ()=>{
    // const {play_new_song} = useContext(CurrentSongContext);
    // useEffect(()=>{
    //    play_new_song(Data[0]);
    // },[]);
    return(
       <>
       <h2 className="down_head"><span id="a1"><FontAwesomeIcon icon={faDownload}/></span><span id="a2">Your Downloads...</span></h2>
       <br />
       <hr style={{backgroundColor:"black"}}/>
       <br />
       {
           Data.map((song,index)=>{
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