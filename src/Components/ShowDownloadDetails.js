import React from "react";
import DownloadDetails from "./DownloadDetails";

const ShowDownloadDetails = ({results})=>{
  return(
      <>
      {
        results.map((song,index)=>{
            return(
                <div key={index}>
                   <DownloadDetails song={song} index={index} />
                </div>
            );  
           })
      }
      </>
  );
}

export default ShowDownloadDetails;