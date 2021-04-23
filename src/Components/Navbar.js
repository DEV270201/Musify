import React,{useState,useEffect, useContext} from "react";
import {faBars,faMusic} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";
import "../Css/Navbar.css";
import { ThemeContext } from "../Context/ThemeContextProvider";

const Navbar = ()=>{
    const [menu,setMenu] = useState(false);
    const [color,setColor] = useState(false);
    const {theme,dispatch} = useContext(ThemeContext);

    useEffect(()=>{

        const change_color = ()=>{
            if(window.scrollY > 200){
               setColor(true);
            }else{
                setColor(false);
            }
        }

        window.addEventListener("scroll",change_color);

        return(()=>{
            window.removeEventListener("scroll",change_color);
        })

    },[]);

    const myfunc = ()=>{
        if(theme.theme === "light"){
            dispatch({type : "DARK THEME"})
        }else{
            dispatch({type : "Light THEME"})
        }
    }

    return(
        <>
        <nav className={color ? "nav_bar activate" : "nav_bar "}>
           <div className="menu_logo" onClick={()=> setMenu(!menu)}><FontAwesomeIcon icon={faBars}  color="white" size="lg"/></div>
            <h3 className={"nav_logo"}><NavLink to="/" exact><FontAwesomeIcon size="lg" className="music" icon={faMusic}/>Musify</NavLink></h3>
            <ul className={menu ? "list active" : "list"}>
                {/* <h4  className={menu ? "link_head active_head" : "link_head"}><FontAwesomeIcon size="lg" className="music" icon={faMusic}/>Musify</h4> */}
                {/* <hr /> */}
                <li onClick={()=> setMenu(!menu)}><NavLink className="nav_link"  exact to="/" >Home</NavLink></li>
                <li onClick={()=> setMenu(!menu)}><NavLink className="nav_link"  to="/online" >Online</NavLink></li>
                <li onClick={()=> setMenu(!menu)}><NavLink className="nav_link"  to="/favourite" >Favourites</NavLink></li>
            </ul>
            <div className="toggle">
            <h4>Light</h4>
            <input type="checkbox" onClick={myfunc} id="switch" /><label htmlFor="switch">Toggle</label>
            <h4>Dark</h4>
            </div>
        </nav>
        </>
    );
}

export default Navbar;