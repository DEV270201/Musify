//CURRENTSONG REDUCER
import Data from "../musicData/Data";

const CurrentSongReducer = (state,action)=>{
  switch(action.type){
      case "CHANGE_MUSIC":
        console.log("event fired");
        //here we are dynamically adding index to the objects 
        //if the object has already an index property then no need to assign it again
        if(!Data[action.payload.index].hasOwnProperty('index')){
          return {...Data[action.payload.index], index : action.payload.index};
        }else{
          return Data[action.payload.index];
        }
      default:
        return state;
  }
}

export default CurrentSongReducer;