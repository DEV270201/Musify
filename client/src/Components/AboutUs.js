import React from "react";
import "../Css/AboutUs.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const AboutUs = ()=> {
   return(
       <>
       <div className="outer_about">
        <div className="inner_about">
       <div className="about_text">
            <h3 className="about_head">ABOUT US</h3>
                  <h6 className="about_desc"><span id="span_desc"> Musify </span>is one of the guitar covers playing platforms right now in the industry. We attempt to provide our users the best experience and the services that we can. We constantly work for the betterment of the user's experience. We believe in hardwork and respect the choice of our listeners.</h6>
          </div>
           <div className="about_logo">
              <FontAwesomeIcon id="span" icon={faMusic}/>
           </div>
           </div>
       </div>
       {/* <hr style={{color: "white"}}/> */}
       </>
   );
}

export default AboutUs;