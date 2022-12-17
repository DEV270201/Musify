import React,{useState,useEffect, useContext,useRef} from "react";
import {faBars,faMusic} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";
import "../Css/Navbar.css";
import { ThemeContext } from "../Context/ThemeContextProvider";

const Navbar = ()=>{

    const [color,setColor] = useState(false);
    const {theme,dispatch} = useContext(ThemeContext);
    const menu_ref = useRef(null);

    useEffect(()=>{

        const change_color = ()=>{
            if(window.scrollY > 50){
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
            dispatch({type : "DARK_THEME"})
        }else{
            dispatch({type : "LIGHT_THEME"})
        }
    }

    return(
        <>
        <nav className={color ? "nav_bar activate" : "nav_bar "}>
           <div className="menu_logo" onClick={()=> menu_ref.current.classList.toggle("active")}><FontAwesomeIcon icon={faBars}  color="white" size="lg"/></div>
            <h3 className={"nav_logo"}><NavLink to="/" exact><FontAwesomeIcon size="lg" className="music" icon={faMusic}/>Musify</NavLink></h3>
            <ul className="list" ref={menu_ref}>
                {/* <h4  className={menu ? "link_head active_head" : "link_head"}><FontAwesomeIcon size="lg" className="music" icon={faMusic}/>Musify</h4> */}
                {/* <hr /> */}
                <li onClick={()=> menu_ref.current.classList.toggle("active")}><NavLink className="nav_link"  exact to="/" >Home</NavLink></li>
                    {/* <li onClick={()=> menu_ref.current.classList.toggle("active")}><NavLink className="nav_link"  to="/online" >Online</NavLink></li> */}
                <li onClick={()=> menu_ref.current.classList.toggle("active")}><NavLink className="nav_link"  to="/favourite" >Favourites</NavLink></li>
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