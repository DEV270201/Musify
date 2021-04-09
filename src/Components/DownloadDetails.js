import React,{useContext} from "react";
import "../Css/DownloadDetails.css";
import {CurrentSongContext} from "../Context/CurrentSongProvider";

const DownloadDetails = ({song})=>{
    
    const {currentSong,play_new_song} = useContext(CurrentSongContext);
    const playNewSong = ()=>{
       console.log("calling the context method");
       play_new_song(song);
    }

   return(
       <>
       <div className="details_outer">
          <div className="img_class">
              <img src={song.src} alt={song.name} />
          </div>
          <div className="info_class">
              <div className="header_info">
                <h3 className="header_info_1">{song.name}</h3>
                <h5 className="header_info_2">{song.artist}</h5>
              </div>
              <div className="buttons">
                 <button className="start_btn" onClick={playNewSong}>{song === currentSong ? "Now Playing" : "Play"}</button>
              </div>
          </div>
       </div>
       </>
   );
}

export default DownloadDetails;