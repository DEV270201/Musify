import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const CurrentSongContext = createContext("");

export const CurrentSongProvider = (props)=>{

    //creating this object because if either one updates first the dom is rendered again and creates issues due to conditions imposed on load and current song
    const [currentSongAndLoad, setCurrentSongAndLoad] = useState({
        cs: null, //cs : current song
        load: true // : loading status
    });
    const [covers, setCovers] = useState([]);

    //using useeffect for requesting all the guitar covers
    useEffect(() => {
        getCovers();
    }, []);

    const getCovers = async () => {
        try {
            let resp = await axios.get("http://127.0.0.1:4000/music");
            console.log("resp : ", resp);
            setCovers(resp.data.data);
            setCurrentSongAndLoad({ cs: resp.data.data[0], load: false });
        } catch (err) {
            console.log("err in getting music: ", err);
            setCurrentSongAndLoad({ cs: null, load: false });
        }
    }

    const play_new_song = (id) => {
        let newSong = covers.filter((song) => {
            if (song._id === id) {
                return song;
            }
        });

        setCurrentSongAndLoad((data) => {
            return { ...data, cs: newSong[0] }
        });
    }

    const playNext = (id) => {
        let found = false;
        let newSong = covers.find((song, index) => {
            console.log("index : ", index);
            if (found) {
                return song;
            } else if (index === covers.length - 1) {
                console.log(covers[0]);
                return covers[0];
            } else if (id === song._id) {
                found = true;
            }
        });

        setCurrentSongAndLoad((data) => {
            return { ...data, cs: newSong }
        });
    }

    const playPrev = (id) => {
        let found = null;
        let newSong
        for (let i = covers.length - 1; i >= 0; i--) {
            if (found) {
                newSong = covers[found - 1];
                break;
            } else if (i == 0) {
                newSong = covers[covers.length - 1];
                break;
            } else if (id === covers[i]._id) {
                found = i;
            }
        }

        setCurrentSongAndLoad((data) => {
            return { ...data, cs: newSong }
        });
    }

    const playShuffle = () => {
        setCurrentSongAndLoad((data) => {
            return { ...data, cs: covers[Math.floor(Math.random() * 100) % covers.length] }
        });
    }

   return(
       <>
           <CurrentSongContext.Provider value={{ currentSongAndLoad, covers, play_new_song, playNext, playShuffle, playPrev }}>
          {
              props.children
          }
       </CurrentSongContext.Provider>
       </>
   );
}

