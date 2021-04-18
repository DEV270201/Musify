import React from "react";
import "../Css/Home.css";
import Background from "./Background";
import AboutUs from "./AboutUs";
import MusicCompo from "./MusicCompo";
import MyMap from "./Map";

const Home = ()=>{
  return(
      <>
      <div className="home">
      <Background />
      <AboutUs />
      <MusicCompo />
      <div id="mymap">
      <h1>Map</h1>
      <div style={{border : "1px solid white",padding : "10px", borderRadius : "10px"}}>
      <MyMap />
      </div>
      </div>
      </div>
      </>
  );
}

export default Home;