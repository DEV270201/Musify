import React from "react";
import "../Css/Copyright.css"

const Copyright = ()=>{
   let date = new Date().getFullYear();
   return(
       <>
       <div className="copyright">
       <h5 className="cpy_1"> Copyright © {date}</h5>
       <h5 className="cpy_2">Created By: Devansh Shah</h5>
       </div>
       </>
   );
}

export default Copyright;