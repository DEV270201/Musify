import React,{useState,useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons';
import Data1 from "../Data/Data1";
import {NavLink} from "react-router-dom";
import "../Css/Background.css";

const Background = ()=>{
    const[hour,setHour] = useState(0);
    const[current,setCurrent] = useState(0);

    useEffect(()=>{
      let hour = new Date().getHours();
      setHour(hour);
      const value = setInterval(()=>{                                     //timer for auto slideshow
         setCurrent((prevState)=>{
             return ((prevState+1) % Data1.length);
         })
      },4000);
     return(()=>{
           clearInterval(value);
     });
    },[]);
  return(
      <>
      <div className="outer_back">
      {
          Data1.map((element,index)=>{
              return(
               <div key={index} className={current === index ? "slide active" : "slide"}>
            { current === index && (
              <div className="banner"  style={{backgroundImage: `url(${element.src})`}}>
              <div className="greet_div">
          <h2 className="greeting">{hour < 12 ? "Good Morning, Folk!" : ( hour < 16 ? "Good Afternoon , Folk!" : (hour < 21 ? "Good Evening, Folk!" : "Good Night, Folk!") )}</h2>
          </div>
          <div className="message">
              <h3 className="msg">Tired ? Work Stress ? Don't Worry !</h3>
              <h3 className="msg">Listen to your Favourite Songs !</h3>
              <h3 className="msg">Just on <span id="span">MUSIFY !</span></h3>
              <NavLink to="/download"><button className="download">Go To Downloads <FontAwesomeIcon icon={faLongArrowAltRight}></FontAwesomeIcon></button></NavLink>
          </div>
          </div>
          )
            }
          </div>
              );
          })
      }
      </div>
      </>
  );
}

export default Background;