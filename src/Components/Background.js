import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import Data1 from "../Data/Data1";
import { NavLink } from "react-router-dom";
import "../Css/Background.css";

const Background = () => {
    //for tracking the current index of the background image
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const value = setInterval(() => {                                     //timer for auto slideshow
            setCurrent((prevState) => {
                return ((prevState + 1) % Data1.length);   //always use the callback appraoch if we want to update our state based on previous state.
                //Because it ensures that our previoous state is updated and we will not face any bugs into the future
            });
        }, 3000);
        return (() => {
            clearInterval(value);
        });
    }, []);

    return (
        <>
                <div className="banner" style={{ backgroundImage: `url(${Data1[current].src})` }}>
                    <div className="greet_div">
                        <h2 className="greeting">{new Date().getHours() < 12 ? "Good Morning, Folk!" : (new Date().getHours() < 16 ? "Good Afternoon , Folk!" : (new Date().getHours() < 21 ? "Good Evening, Folk!" : "Good Night, Folk!"))}</h2>
                    </div>
                    <div className="message">
                        <h3 className="msg">Tired ? Work Stress ? Don't Worry !</h3>
                        <h3 className="msg">Listen to your Favourite Songs !</h3>
                        <h3 className="msg">Just on <span id="span">MUSIFY !</span></h3>
                        <button className="download"><NavLink to="/download">Go To Downloads <FontAwesomeIcon icon={faLongArrowAltRight}></FontAwesomeIcon></NavLink></button>
                    </div>
                </div>
        </>
    );
    }
    export default Background;