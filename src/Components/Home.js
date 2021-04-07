import React from "react";
import "../Css/Home.css";
import Background from "./Background";
import AboutUs from "./AboutUs";
import MusicCompo from "./MusicCompo";

const Home = ()=>{
  return(
      <>
      <div className="home">
      <Background />
      <AboutUs />
      <MusicCompo />
      </div>
      </>
  );
}

export default Home;