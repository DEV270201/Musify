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
       <h2 className="down_head"><FontAwesomeIcon icon={faDownload}/><span>Your Downloads...</span></h2>
       <br />
       {
           Data.map((song,index)=>{
            return(
                <div key={index}>
                   <DownloadDetails song={song} />
                </div>
            );  

            
           })
       }
       </>
   );
}

export default Download;