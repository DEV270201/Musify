import React,{useState,useEffect,useRef,useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay,faBackward,faForward,faPause,faMusic,faRedo} from '@fortawesome/free-solid-svg-icons';
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import "../Css/musicPlayer.css";
import {CurrentSongContext} from "../Context/CurrentSongProvider";


const MusicPlayer = ()=>{
    const[isPlaying, setPlay] = useState(true);  //to check whether the song is playing or not
    const[current_time,setTime] = useState(0);   // to trace the current time of the music
    const[liked,setLike] = useState(false);     //to check whether the video is liked or not
    const[replay,setReplay] = useState(false);  //to check whether the song is on repeat or not
    const firstTimeRender = useRef(true);
    const music = useRef(null);
    const {currentSong} = useContext(CurrentSongContext);
    
    // let audio = new Audio("Memories.mp3");
//react allows us to add multiple useEffect hooks to perform different tasks.



useEffect(()=>{
    music.current.src = currentSong.audio;
    // setPlay(true);
    console.log("first");
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
        music.current.addEventListener("ended", ()=>  music.current.play());
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
        alert("added to the fav");
        // console.log(Data[1].isLiked);
        // Data[1].isLiked = true;
    }

    const remove_from_fav = ()=>{
        alert("removed from  the fav");
    }

    const add_to_repeat = ()=>{
        alert("added to the repeat");
    }
     
    const remove_from_repeat = ()=>{
        alert("removed from  the repeat");
    }

    return(
        <>
        <div className="outer">
            <div className="inner">
                <div className="music_details">
                    <h2 className="song"><FontAwesomeIcon icon={faMusic}/>{currentSong.name}</h2>
                    <h4 className="artist">{currentSong.artist}</h4>
                </div>
                <img className={isPlaying ? "myimg anime" : "myimg"} src={currentSong.src} alt="song cover page" />
                <audio className="music" ref={music}>
                    <source src={currentSong.audio} type="audio/mpeg"/>
                 </audio>
                <div className="progressbar">
                    <div className="timer">
                        <h5 className="start">{Math.floor(current_time)} s</h5>
                        <h5 className="end">{currentSong.end} s</h5>
                    </div>
                    <div className="progress_outer" onClick={change_time}>
                        <div className="progress" style={{width: `${Math.floor(current_time/currentSong.end * 100)}%`}}></div>
                    </div>
                </div>
                <div className="music_controls">
                    <div className="prev"><FontAwesomeIcon icon={faBackward}/></div>
                    <div className="play_outer">
                        <div className="play" onClick={myfunc}><FontAwesomeIcon icon={isPlaying ? faPause : faPlay}/></div>
                    </div>
                    <div className="next"><FontAwesomeIcon icon={faForward}/></div>
                </div>
                <div className="icons">
                <div className={`repeat ${replay ? "addrepeat" : "" }`} onClick={()=> update_info_repeat()} ><FontAwesomeIcon title="Repeat" icon={faRedo}/></div>
                <div className={`like ${liked ? "addeffect" : "" }`} onClick={()=> update_info_like()}><FontAwesomeIcon title="Like" icon={faHeart}/></div>
                </div>
            </div>
        </div>
        </>
    );
}

export default MusicPlayer;