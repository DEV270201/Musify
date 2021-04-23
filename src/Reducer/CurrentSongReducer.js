//CURRENTSONG REDUCER

const CurrentSongReducer = (state,action)=>{
  switch(action.type){
      case "CHANGE MUSIC":
        return {...action.payload.song , index : action.payload.index};
      default:
        return state;
  }
}

export default CurrentSongReducer;