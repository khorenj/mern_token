import React, {useContext} from 'react';
import {NavLink, useNavigate,useLocation} from 'react-router-dom';
import {AuthContext} from "../context/auth.context";

export const Navbar= () =>{
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useContext(AuthContext);
    const logoutHandler = event =>{
        event.preventDefault();
        auth.logout();
        navigate("/");
    }

    const userType = auth.userType;

    return (

        <nav>
            <div className="nav-wrapper blue darken-1" style={{padding:"0 2rem"}}>
                <span  className="brand-logo">Web app</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">

                    <li className={location.pathname === "/users"?"active":""}><NavLink to="/users">All Users</NavLink></li>

                    <li><a href="/" onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav>
    )
}