import { useState } from 'react'
import Auth from "../auth/auth";
import { NavLink as Link, useNavigate } from "react-router-dom";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./navbarElements";

const Navbar = ({visibillity, setVisibillity}) => {
    // const history = useNavigate();
    // const signIn = () => {
    //     history("/login");
    // };

    return (
        <Nav>
            <NavLink to="/home">
                <h1>ZenBuilds</h1>
            </NavLink>
            <Bars onClick={() => setVisibillity(true)}/>
            <NavMenu value={visibillity}>
                <NavLink to="/home">
                    Home
                </NavLink>
                <NavLink to="/global" >
                    Global
                </NavLink>
                <NavLink to="/leaderboard" >
                    Leaderboard
                </NavLink>
                <NavLink to="/profile" >
                    Profile
                </NavLink>
            </NavMenu>

            {localStorage.getItem("token") ? (
                <NavBtn>
                    <NavBtnLink to="/" onClick={Auth.logout}>Sign Out</NavBtnLink>
                </NavBtn>
            ) : (
                <NavBtn>
                    <NavBtnLink to="/login">Sign In</NavBtnLink>
                </NavBtn>
            )}
        </Nav>
        // <header>
        //     <h1>this is the navbar</h1>
        // {localStorage.getItem('token') ? (
        //     <button onClick={Auth.logout}>Sign Out</button>
        // ) : (
        //     <button onClick={signIn}>Sign In</button>
        // )}
        // </header>
    );
};

export default Navbar;
