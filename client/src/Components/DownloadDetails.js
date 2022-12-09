import React,{useContext} from "react";
import "../Css/DownloadDetails.css";
import {CurrentSongContext} from "../Context/CurrentSongProvider";
import {ThemeContext} from "../Context/ThemeContextProvider";

const DownloadDetails = ({song})=>{
    
    const {currentSong,dispatch1} = useContext(CurrentSongContext);
    const {theme} = useContext(ThemeContext);

    const playNewSong = ()=>{
    //checking if the user presses on the play button for the music that is already being played , then we will not fire the dispatch function          
              if(!(currentSong.id  === song.id)){
                dispatch1({type: "CHANGE_MUSIC" , payload : {id : song.id}});
              }
    }

   return(
       <>
       <div className="details_outer" style={{backgroundColor : `${theme.backgroundColor}`, color : `${theme.color}` , border : `1px solid ${theme.color}`}}>
          <div className="img_class">
              <img src={song.src} alt={song.name} />
          </div>
          <div className="info_class">
              <div className="header_info">
                <h3 className="header_info_1">{song.name}</h3>
                <h5 className="header_info_2">{song.artist}</h5>
              </div>
              <div className="buttons">
                 <button className={`start_btn ${theme.theme}`}  onClick={playNewSong}>{song.name === currentSong.name ? "Now Playing" : "Play"}</button>
              </div>
          </div>
       </div>
       </>
   );
}

export default DownloadDetails;