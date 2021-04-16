import React,{useState,useEffect,useRef,useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay,faBackward,faForward,faPause,faMusic,faRedo} from '@fortawesome/free-solid-svg-icons';
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import "../Css/musicPlayer.css";
import {CurrentSongContext} from "../Context/CurrentSongProvider";
import {ThemeContext} from "../Context/ThemeContextProvider";
import Data from "../musicData/Data";


const MusicPlayer = ()=>{
    const[isPlaying, setPlay] = useState(false);  //to check whether the song is playing or not
    const[current_time,setTime] = useState(0);   // to trace the current time of the music
    const[liked,setLike] = useState(false);     //to check whether the video is liked or not
    const[replay,setReplay] = useState(false);  //to check whether the song is on repeat or not
    const firstTimeRender = useRef(true);
    const[minute,setMinute] = useState("00");
    const[seconds,setSeconds] = useState("00");
    const music = useRef(null);
    const {currentSong , play_new_song} = useContext(CurrentSongContext);
    const {theme} = useContext(ThemeContext);

    
    // let audio = new Audio("Memories.mp3");
//react allows us to add multiple useEffect hooks to perform different tasks.



useEffect(()=>{
    music.current.src = currentSong.audio;
    // setPlay(true);
    console.log("first");
    // console.log("current song" , currentSong);
    // console.log(music.current.currentSrc);
    // return(
    //     ()=>{
    //         console.log("returned");
    //         setPlay(false);
    //     }
    // );
},[currentSong]);

    useEffect(()=>{

        const update_time = (event)=>{
            // console.log(event);
            // console.log(event.target.currentTime);
            setTime(event.target.currentTime);
        }
        if(isPlaying){
        console.log("second");
        music.current.play();
        music.current.addEventListener("timeupdate",update_time);
        music.current.addEventListener("ended", ()=>{
            //   play_new_song(Data[(currentSong.index + 1) % Data.length],(currentSong.index + 1) % Data.length); 
                 music.current.play();
            });  
        // console.log(currentSong.audio);
        var music_tracker = music.current;   //for storing the refernce of music.current  
        }
        else{
        console.log("paused");
        music.current.pause();
        }
        // console.log(music.current);
        return(()=>{
            // console.log("first");
        if(music_tracker){
            music_tracker.removeEventListener("timeupdate",update_time);
        }
        });
    },[isPlaying]);

    useEffect(()=>{
        let sec = Math.floor(current_time) % 60;
        let min = Math.floor(Math.floor(current_time) / 60);
        // console.log(sec + "   " + min);
        let computedsec = String(sec).length === 1 ? `0${sec}` : `${sec}`;
        let computedMin = String(min).length === 1 ? `0${min}` : `${min}`;

        setSeconds(computedsec);
        setMinute(computedMin);

    },[current_time]);

    useEffect(()=>{
        if(!firstTimeRender.current)
        liked ? add_to_fav() : remove_from_fav();
    },[liked]);

    useEffect(()=>{
        if(!firstTimeRender.current)
        replay ? add_to_repeat() : remove_from_repeat();
    },[replay]);

    useEffect(()=>{
        firstTimeRender.current = false;
        // console.log(music.current.duration);
        // console.log(Music);
      },[]);

    const myfunc = ()=>{
      setPlay(!isPlaying);
    }

    const change_time = (event)=>{
        // console.log(event.target.clientWidth);
        // console.log(event.nativeEvent.offsetX);
        music.current.currentTime = event.nativeEvent.offsetX / event.target.clientWidth * music.current.duration;
    }

    const update_info_like = ()=>{
        setLike(!liked);
    }
    
    const update_info_repeat = ()=>{
        setReplay(!replay);
    }

    const add_to_fav = ()=>{
        console.log("added to the fav");
        // console.log(Data[1].isLiked);
        // Data[1].isLiked = true;
    }

    const remove_from_fav = ()=>{
        console.log("removed from  the fav");
    }

    const add_to_repeat = ()=>{
        console.log("added to the repeat");
    }
     
    const remove_from_repeat = ()=>{
        console.log("removed from  the repeat");
    }

    const nextMusic = ()=>{
      play_new_song(Data[(currentSong.index + 1) % Data.length],(currentSong.index + 1) % Data.length);
    }

    const prevMusic = ()=>{
        if(currentSong.index === 0){
           play_new_song(Data[Data.length-1],Data.length-1);
        }else{
            play_new_song(Data[currentSong.index-1],currentSong.index - 1);
        }
    }

    return(
        <>
        <div className="outer" style={{backgroundColor : `${theme.backgroundColor}`}}>
            <div className="inner" style={{backgroundColor : `${theme.backgroundColor}`}}>
                <div className="music_details">
                    <h2 className="song" style={{color : `${theme.color}`}}><span id="a1"><FontAwesomeIcon icon={faMusic}/></span><span id="a2">{currentSong.name}</span></h2>
                    <h4 className="artist" style={{color : `${theme.color}`}}>{currentSong.artist}</h4>
                </div>
                <img className={isPlaying ? "myimg anime" : "myimg"} src={currentSong.src} alt="song cover page" />
                <audio className="music" ref={music}>
                    <source src={currentSong.audio} type="audio/mpeg"/>
                 </audio>
                <div className="progressbar">
                    <div className="timer">
                        <h5 className="start" style={{color : `${theme.color}`}}>{minute} : {seconds}</h5>
                        <h5 className="end" style={{color : `${theme.color}`}}>{currentSong.end}</h5>
                    </div>
                    <div className="progress_outer" onClick={change_time} style={{background : `${theme.backgroundColor}`}}>
                        <div className="progress" style={{width: `${Math.floor(current_time/currentSong.end * 100)}%`}}></div>
                    </div>
                </div>
                <div className="music_controls">
                    <div className="prev" onClick={prevMusic} style={{color : `${theme.color}`}}><FontAwesomeIcon title="Previous" icon={faBackward}/></div>
                    <div className="play_outer" style={{color : `${theme.color}` , backgroundColor : `${theme.backgroundColor}`}}>
                        <div className="play" onClick={myfunc}><FontAwesomeIcon title={`${isPlaying ? 'Playing' : 'Paused'}`} icon={isPlaying ? faPause : faPlay}/></div>
                    </div>
                    <div className="next" onClick={nextMusic} style={{color : `${theme.color}`}}><FontAwesomeIcon title="Next" icon={faForward}/></div>
                </div>
                <div className="icons">
                <div className={`repeat ${replay ? "addrepeat" : "" }`} style={{color : `${theme.color}`}} onClick={()=> update_info_repeat()} ><FontAwesomeIcon title="Repeat" icon={faRedo}/></div>
                <div className={`like ${liked ? "addeffect" : "" }`} style={{color : `${theme.color}`}} onClick={()=> update_info_like()}><FontAwesomeIcon title="Like" icon={faHeart}/></div>
                </div>
            </div>
        </div>
        </>
    );
}

export default MusicPlayer;