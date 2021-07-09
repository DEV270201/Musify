import React, { useContext } from "react";
import "../Css/Combo.css";
import Download from "./Download";
import MusicPlayer from "./MusicPlayer";
import {ThemeContext} from "../Context/ThemeContextProvider";


const Combo = ()=>{
  const {theme} = useContext(ThemeContext);
  return (
      <>
      <div className="outer_combo">
      {/* <CurrentSongProvider> */}
          <div className={`download_combo ${theme.theme === "light" ? 'light' : 'dark' }`} style={{backgroundColor : `${theme.backgroundColor}`, color : `${theme.color}`}}>
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