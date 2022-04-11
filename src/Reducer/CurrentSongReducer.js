//CURRENTSONG REDUCER
import Data from "../MusicData/Data";

const CurrentSongReducer = (state,action)=>{
  switch(action.type){
      case "CHANGE_MUSIC":
        // console.log("event fired");
        // console.log(Data[action.payload.id]);
        //if at all during the shuffle function if the random gives us the same song which was played currently then we will return the next song
        if(state.id === action.payload.id){
          // console.log('same song came again');
          return Data[(action.payload.id + 1) % Data.length];
        }else{
          return Data[action.payload.id];
        }
      default:
        return state;
  }
}

export default CurrentSongReducer;