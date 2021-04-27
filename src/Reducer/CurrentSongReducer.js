//CURRENTSONG REDUCER
import Data from "../musicData/Data";

const CurrentSongReducer = (state,action)=>{
  switch(action.type){
      case "CHANGE_MUSIC":
        console.log("event fired");
        return {...Data[action.payload.index], index : action.payload.index};
      default:
        return state;
  }
}

export default CurrentSongReducer;