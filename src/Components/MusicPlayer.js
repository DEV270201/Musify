import React, { useState, useEffect, useRef, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faBackward, faForward, faPause, faMusic, faRedo, faRandom} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import "../Css/musicPlayer.css";
import { CurrentSongContext } from "../Context/CurrentSongProvider";
import { ThemeContext } from "../Context/ThemeContextProvider";
import Data from "../MusicData/Data";

//whenever re renders takes place and you want to change songs or play pause , explicitly use these play pause commands 
// otherwise it wont work

const MusicPlayer = () => {
    const [isPlaying, setPlay] = useState(true);  //to check whether the song is playing or not
    const [current_time, setTime] = useState(0);   // to trace the current time of the music
    const [liked, setLike] = useState(false);     //to check whether the video is liked or not
    const firstTimeRender = useRef(true);
    const [songTime, setSongTime] = useState({
        mins: "00",
        secs: "00",
    });
    const [progressWidth, setProgressWidth] = useState(0); //for chaning the width of the progress bar
    const music = useRef(null);
    const { currentSong, dispatch1 } = useContext(CurrentSongContext);
    const { theme } = useContext(ThemeContext);
    const randomRef = useRef(null);
    const replayRef = useRef(null);
    // const likeRef = useRef(null);

    //react allows us to add multiple useEffect hooks to perform different tasks.
    const update_time = (event) => {
        // console.log(progressWidth);
        setTime(event.target.currentTime);
        setProgressWidth(Math.floor(event.target.currentTime / event.target.duration * 100));
    }

    const ended = () => {
        //if the shuffling button is on then we will shuffle the music by generating random numbers    
        if (randomRef.current.style.color !== theme.color) {
            dispatch1({ type: "CHANGE_MUSIC", payload: { id: Math.floor(Math.random() * 100) % Data.length } });
        } else if (replayRef.current.style.color !== theme.color) {
            music.current.play();
        } else {
            dispatch1({ type: "CHANGE_MUSIC", payload: { id: (currentSong.id + 1) % Data.length } });
        }
    }

    useEffect(() => {
        music.current.src = currentSong.audio;
        //if isplaying is true then only play the music
        if(isPlaying)
         music.current.play();
        //for each and every song we will add the event listeners for proper functioning
        music.current.addEventListener("timeupdate", update_time);
        music.current.addEventListener("ended", ended);
        var music_tracker = music.current;   //for storing the refernce of music.current  

        // for cleaning purposes
        return (() => {
            if (music_tracker) {
                music_tracker.removeEventListener("timeupdate", update_time);
                music_tracker.removeEventListener("ended", ended);
            }
        });

    }, [currentSong]);

    //for playing and pausing the music
    useEffect(() => {
        if (isPlaying){
            music.current.play(); 
        }
        else {
            music.current.pause();
        }
    }, [isPlaying]);

    //Music Timer
    useEffect(() => {
        let sec = Math.floor(current_time) % 60;
        let min = Math.floor(Math.floor(current_time) / 60);

        setSongTime({
            mins: String(min).length === 1 ? `0${min}` : `${min}`,
            secs: String(sec).length === 1 ? `0${sec}` : `${sec}`,
        })

    }, [current_time]);

    //Liked/Disliked
    useEffect(() => {
        if (!firstTimeRender.current)
            liked ? add_to_fav() : remove_from_fav();
    }, [liked]);
 

    useEffect(() => {

        //used because whenever for the first time the page is loaded then the song is not liked/put on repeat by default
        firstTimeRender.current = false;
    }, []);

    const myfunc = () => {
        setPlay(!isPlaying);
    }

    const change_time = (event) => {
        music.current.currentTime = event.nativeEvent.offsetX / event.target.clientWidth * music.current.duration;
    }

    const update_info_like = () => {
        setLike(!liked);
    }

    const update_info_repeat = () => {
        if(randomRef.current.style.color !== theme.color) {
            randomRef.current.style.color = theme.color;
            replayRef.current.style.color = '#4cd137';
        }else if(replayRef.current.style.color !== theme.color){
            replayRef.current.style.color = theme.color;
        }else{
            replayRef.current.style.color = '#4cd137';
        }
    }

    const update_info_random = () => {
        if(replayRef.current.style.color !== theme.color) {
            replayRef.current.style.color = theme.color;
            randomRef.current.style.color = '#4cd137';
        }else if(randomRef.current.style.color !== theme.color){
            randomRef.current.style.color = theme.color;
        }else{
            randomRef.current.style.color = '#4cd137';
        }
    }

    const add_to_fav = () => {
        console.log("added to the fav");
        // console.log(Data[1].isLiked);
        // Data[1].isLiked = true;
    }

    const remove_from_fav = () => {
        console.log("removed from  the fav");
    }


    //changing the song
    const nextMusic = () => {
        //if you are playing the next song and if the current song was on repeat, then remove it from repeat
        if(replayRef.current.style.color !== theme.color) {
            replayRef.current.style.color = theme.color;
        }
        //   dispatch({type : "CHANGE_MUSIC" , payload : {index : ((currentSong.index + 1) % Data.length)}});
        dispatch1({ type: "CHANGE_MUSIC", payload: { id: (currentSong.id + 1) % Data.length } });

    }

    //changing the song
    const prevMusic = () => {
         //if you are playing the previous song and if the current song was on repeat, then remove it from repeat
         if(replayRef.current.style.color !== theme.color) {
            replayRef.current.style.color = theme.color;
        }
        if (currentSong.id === 0) {
            dispatch1({ type: "CHANGE_MUSIC", payload: { id: Data.length - 1 } });
        } else {
            dispatch1({ type: "CHANGE_MUSIC", payload: { id: currentSong.id - 1 } });
        }
    }

    return (
        <>
            <div className="outer" style={{ backgroundColor: `${theme.backgroundColor}` }}>
                <div className="inner" style={{ backgroundColor: `${theme.backgroundColor}` }}>
                    <div className="music_details">
                        <h2 className="song" style={{ color: `${theme.color}` }}><span id="a1"><FontAwesomeIcon icon={faMusic} /></span><span id="a2">{currentSong.name}</span></h2>
                        <h4 className="artist" style={{ color: `${theme.color}` }}>{currentSong.artist}</h4>
                    </div>
                    <img className={isPlaying ? "myimg anime" : "myimg"} src={currentSong.src} alt="song cover page" />
                    <audio className="music" ref={music}>
                        <source src={currentSong.audio} type="audio/mp3" />
                    </audio>
                    <div className="progressbar">
                        <div className="timer">
                            <h5 className="start" style={{ color: `${theme.color}` }}>{songTime.mins} : {songTime.secs}</h5>
                            <h5 className="end" style={{ color: `${theme.color}` }}>{currentSong.end}</h5>
                        </div>
                        <div className="progress_outer" onClick={change_time} style={{ background: `${theme.backgroundColor}` }}>
                            <div className="progress" style={{ width: `${progressWidth}%` }}></div>
                        </div>
                    </div>
                    <div className="music_controls">
                        <div className="prev" onClick={prevMusic} style={{ color: `${theme.color}` }}><FontAwesomeIcon title="Previous" icon={faBackward} /></div>
                        <div className="play_outer" style={{ color: `${theme.color}`, backgroundColor: `${theme.backgroundColor}` }}>
                            <div className="play" onClick={myfunc}><FontAwesomeIcon title={`${isPlaying ? 'Playing' : 'Paused'}`} icon={isPlaying ? faPause : faPlay} /></div>
                        </div>
                        <div className="next" onClick={nextMusic} style={{ color: `${theme.color}` }}><FontAwesomeIcon title="Next" icon={faForward} /></div>
                    </div>
                    <div className="icons">
                        <div className="random"  style={{color : `${theme.color}`}} onClick={update_info_random} ref={randomRef}><FontAwesomeIcon icon={faRandom} title="Shuffle" /></div>
                        <div className="repeat"  style={{color : `${theme.color}`}} onClick={update_info_repeat} ref={replayRef}><FontAwesomeIcon title="Repeat" icon={faRedo} /></div>
                        <div className="like" style={{ color: `${liked ? '#4cd137' : theme.color}` }} onClick={update_info_like}><FontAwesomeIcon title="Like" icon={faHeart} /></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MusicPlayer;