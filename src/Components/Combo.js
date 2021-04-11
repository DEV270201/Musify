import React, { useContext, useEffect } from "react";
import "../Css/Combo.css";
import Download from "./Download";
import MusicPlayer from "./MusicPlayer";
import {ThemeContext} from "../Context/ThemeContextProvider";


const Combo = ()=>{
  const {theme_status,theme} = useContext(ThemeContext);
  useEffect(()=>{
    console.log(theme_status);
  })
  return (
      <>
      <div className="outer_combo">
      {/* <CurrentSongProvider> */}
          <div className="download_combo" style={{backgroundColor : `${theme.backgroundColor}`, color : `${theme.color}`}}>
             <Download />
          </div>
          <div className="music_combo">
             <MusicPlayer />
          </div>
          {/* </CurrentSongProvider> */}
      </div>
      </>
  );
}

export default Combo;