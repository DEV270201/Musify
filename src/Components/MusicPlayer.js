import React,{useState,useEffect,useRef,useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay,faBackward,faForward,faPause,faMusic,faRedo,faRandom } from '@fortawesome/free-solid-svg-icons';
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import "../Css/musicPlayer.css";
import {CurrentSongContext} from "../Context/CurrentSongProvider";
import {ThemeContext} from "../Context/ThemeContextProvider";
import Data from "../MusicData/Data";


const MusicPlayer = ()=>{
    const[isPlaying, setPlay] = useState(false);  //to check whether the song is playing or not
    const[current_time,setTime] = useState(0);   // to trace the current time of the music
    const[liked,setLike] = useState(false);     //to check whether the video is liked or not
    const[replay,setReplay] = useState(false);  //to check whether the song is on repeat or not
    const [random,setRandom] = useState(false);
    const firstTimeRender = useRef(true);
    const[songTime,setSongTime] = useState({
        mins : "00",
        secs : "00",
    });
    const[progressWidth,setProgressWidth] = useState(0); //for chaning the width of the progress bar
    const music = useRef(null);
    const {currentSong , dispatch1} = useContext(CurrentSongContext);
    const {theme} = useContext(ThemeContext);
    

//react allows us to add multiple useEffect hooks to perform different tasks.
useEffect(()=>{
    music.current.src = currentSong.audio;
    console.log("current song : " + currentSong.id + "  " + currentSong.name);

    // console.log("first");
    // console.log(music.current);
    // console.log(music.current.volume);
    // console.log(music.current.currentTime);

    //we can make use of useReducer instead of calling different useState functions
    setProgressWidth(0);
    setSongTime({
        mins : '00',
        secs : '00'
    });

//we will not execute this code on the first render
    if(!firstTimeRender.current){
        setPlay(true);
        music.current.play();
    }   
},[currentSong]);

    useEffect(()=>{

        const update_time = (event)=>{
            // console.log(progressWidth);
            setTime(event.target.currentTime);
            setProgressWidth(Math.floor(event.target.currentTime/event.target.duration * 100));
        }
 
        const ended = ()=>{

        console.log("music over");    
        
        //if the shuffling button is on then we will shuffle the music by generating random numbers    
            if(random){
               dispatch1({type : "CHANGE_MUSIC" , payload : {id : Math.floor(Math.random() * 100) % Data.length}}); 
            }else if(replay){
                music.current.play();
            }else{
                // dispatch1({type: "CHANGE_MUSIC" , payload : {id : (currentSong.id + 1)%Data.length}});
                console.log("current song : " + currentSong.id + "  " + currentSong.name);
                dispatch1({type: "CHANGE_MUSIC" , payload : {id : (currentSong.id + 1)%Data.length}});
            }
        }

        if(isPlaying){
        music.current.play();
        music.current.addEventListener("timeupdate",update_time);
        music.current.addEventListener("ended", ended);  
        // console.log(currentSong.audio);
        var music_tracker = music.current;   //for storing the refernce of music.current  
        }
        else{
        //as soon as you press the pause button ,  the state is changed and the component is upmounted and mounted again
        music.current.pause();
        }
        
        // for cleaning purposes
        return(()=>{
        if(music_tracker){
            music_tracker.removeEventListener("timeupdate",update_time);
            music_tracker.removeEventListener("ended",ended);
        }
        });
    },[isPlaying,random,replay]);

    //Music Timer
    useEffect(()=>{
        let sec = Math.floor(current_time) % 60;
        let min = Math.floor(Math.floor(current_time) / 60);
        // console.log(sec + "   " + min);
        let computedSec = String(sec).length === 1 ? `0${sec}` : `${sec}`;
        let computedMin = String(min).length === 1 ? `0${min}` : `${min}`;

        setSongTime({
            mins : computedMin,
            secs : computedSec,
        })

    },[current_time]);

    //Liked/Disliked
    useEffect(()=>{
        if(!firstTimeRender.current)
        liked ? add_to_fav() : remove_from_fav();
    },[liked]);

    //repeat/notRepeat
    useEffect(()=>{

        const add_to_repeat = ()=>{
            //if the shuffle is on and the user is putting the song on repeat , so turn off the shuffle
            if(random){
                setRandom(false);
            }
        }
         
        const remove_from_repeat = ()=>{
            console.log("removed from  the repeat");
        }

        if(!firstTimeRender.current)
        replay ? add_to_repeat() : remove_from_repeat();
    },[replay]);

    useEffect(()=>{

       //used because whenever for the first time the page is loaded then the song is not liked/put on repeat by default
       firstTimeRender.current = false;
    },[]);

    const myfunc = ()=>{
      setPlay(!isPlaying);
    }

    const change_time = (event)=>{
        music.current.currentTime = event.nativeEvent.offsetX / event.target.clientWidth * music.current.duration;
    }

    const update_info_like = ()=>{
        setLike(!liked);
    }
    
    const update_info_repeat = ()=>{
        setReplay(!replay);
    }

    const update_info_random = ()=>{
        if(replay){
            setReplay(false);
        }
        setRandom(!random);
    }

    const add_to_fav = ()=>{
        console.log("added to the fav");
        // console.log(Data[1].isLiked);
        // Data[1].isLiked = true;
    }

    const remove_from_fav = ()=>{
        console.log("removed from  the fav");
    }


     //changing the song
    const nextMusic = ()=>{
    console.log("function called");
    //   dispatch({type : "CHANGE_MUSIC" , payload : {index : ((currentSong.index + 1) % Data.length)}});
    dispatch1({type: "CHANGE_MUSIC" , payload : {id : (currentSong.id + 1)%Data.length}});

    }

    //changing the song
    const prevMusic = ()=>{
        if(currentSong.id === 0){
            dispatch1({type : "CHANGE_MUSIC" , payload : {id : Data.length-1}});
        }else{
            dispatch1({type : "CHANGE_MUSIC" , payload : {id : currentSong.id - 1}});
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
                    <source src={currentSong.audio} type="audio/mp3"/>
                 </audio>
                <div className="progressbar">
                    <div className="timer">
                        <h5 className="start" style={{color : `${theme.color}`}}>{songTime.mins} : {songTime.secs}</h5>
                        <h5 className="end" style={{color : `${theme.color}`}}>{currentSong.end}</h5>
                    </div>
                    <div className="progress_outer" onClick={change_time} style={{background : `${theme.backgroundColor}`}}>
                        <div className="progress" style={{width: `${progressWidth}%`}}></div>
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
                <div className="random"  style={{color : `${random ? '#4cd137' : theme.color}`}}  onClick={update_info_random}><FontAwesomeIcon icon={faRandom} title="Shuffle" /></div>
                <div className="repeat" style={{color : `${replay ? '#4cd137' : theme.color}`}} onClick={update_info_repeat} ><FontAwesomeIcon title="Repeat" icon={faRedo}/></div>
                <div className="like"  style={{color : `${liked ? '#4cd137' : theme.color}`}} onClick={update_info_like}><FontAwesomeIcon title="Like" icon={faHeart}/></div>
                </div>
            </div>
        </div>
        </>
    );
}

export default MusicPlayer;