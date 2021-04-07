import React from "react";
import "../Css/Combo.css";
import Download from "./Download";
import MusicPlayer from "./MusicPlayer";
// import {CurrentSongProvider} from "../Context/CurrentSongProvider";


const Combo = ()=>{

  return (
      <>
      <div className="outer_combo">
      {/* <CurrentSongProvider> */}
          <div className="download_combo">
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