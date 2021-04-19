import React from "react";
import img from "../Images/musicplayer.PNG";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight,faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';
import "../Css/MusicCompo.css";

const MusicCompo = ()=>{
   return(
       <>
         <h2 className="music_compo_head">Music Player Design</h2>
       <div className="music_compo_outer" style={{backgroundImage: `url("https://images.unsplash.com/photo-1489797715492-dbd3bd61c6b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")`}}>
        <div className="music_compo_inner">
         <div className="steps1">
           <p className="music_text1">Play Your Music!<FontAwesomeIcon icon={faLongArrowAltLeft}></FontAwesomeIcon></p>
           <p className="music_text2">Amazing Playists!<FontAwesomeIcon icon={faLongArrowAltLeft}></FontAwesomeIcon></p>
         </div>
         <div className="image_compo">
           <img src={img} className="my_music_img" alt="demo_music" />
         </div>
         <div className="steps2">
          <p className="music_text1"><FontAwesomeIcon icon={faLongArrowAltRight}></FontAwesomeIcon>Add to favs!</p>
          <p className="music_text2"><FontAwesomeIcon icon={faLongArrowAltRight}></FontAwesomeIcon>Like and Share!</p>
         </div>
         </div>
       </div>
       </>
   );
}

export default MusicCompo;