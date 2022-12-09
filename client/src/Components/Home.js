import React from "react";
import "../Css/Home.css";
import Background from "./Background";
import AboutUs from "./AboutUs";
import MusicCompo from "./MusicCompo";
// import MyMap from "./Map";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <>
      <div className="home">
        <Background />
        <AboutUs />
        <MusicCompo />
        {/* <div id="mymap">
          <h2 className="map_head"><FontAwesomeIcon icon={faMapMarkerAlt} />       Our Headquarters</h2>
          <div style={{ border: "1px solid white", padding: "10px", borderRadius: "10px" }}>
            <MyMap />
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Home;