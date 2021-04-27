import React,{useContext, useState} from "react";
import "../Css/DownloadDetails.css";
import {CurrentSongContext} from "../Context/CurrentSongProvider";
import {ThemeContext} from "../Context/ThemeContextProvider";

const DownloadDetails = ({song,index})=>{
    
    const {currentSong,dispatch} = useContext(CurrentSongContext);
    const {theme} = useContext(ThemeContext);
    const [hover,addHover] = useState(false);
    const normal = {
        backgroundColor : `${theme.backgroundColor}`,
        color : `${theme.color}`,
        border : `1px solid ${theme.color}`
    }

    const effect = {
        backgroundColor : `${theme.color}`,
        color : `${theme.backgroundColor}`,
        border : `1px solid ${theme.color}`
    }

    const playNewSong = ()=>{
          dispatch({type: "CHANGE_MUSIC" , payload : {index : index}});
    }

    const apply_hover = ()=>{
        addHover(!hover);
        // document.querySelector(".start_btn").style.cssText = `backgroundColor : ${theme.color} ; color : ${theme.backgroundColor}`
    }

    const remove_hover = ()=>{
        addHover(!hover);
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
                 <button className="start_btn" onClick={playNewSong} onMouseEnter={apply_hover} onMouseLeave={remove_hover} style={hover ? effect : normal}>{song.name === currentSong.name ? "Now Playing" : "Play"}</button>
              </div>
          </div>
       </div>
       </>
   );
}

export default DownloadDetails;