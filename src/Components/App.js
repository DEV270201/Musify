import React from "react";
// import MusicPlayer from "./MusicPlayer";
import Navbar from "./Navbar";
import Home from "./Home";
import Online from "./Online";
import Favourite from "./Favourite";
import Copyright from "./Copyright";
// import Download from "./Download";
import Combo from "./Combo";
import {Route,Switch,Redirect} from "react-router-dom";
// import {CurrentSongProvider} from "../Context/CurrentSongProvider";

const App = ()=>{
    return(
        <>
        <Navbar />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/online" component={Online} />
            <Route path="/favourite" component={Favourite} />
            <Route path="/download" component={Combo} />
            <Redirect to="/" />
        </Switch>
        <Copyright />
        </>
    );
}

export default App;