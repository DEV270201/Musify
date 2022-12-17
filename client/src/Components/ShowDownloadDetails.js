import React from "react";
import DownloadDetails from "./DownloadDetails";

const ShowDownloadDetails = ({results})=>{
  return(
      <>
      {
        results.map((song)=>{
            return(
              <div key={song._id}>
                   <DownloadDetails song={song} />
                </div>
            );  
           })
      }
      </>
  );
}

export default ShowDownloadDetails;