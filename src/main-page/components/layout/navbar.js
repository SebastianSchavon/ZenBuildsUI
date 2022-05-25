import { useState } from "react";
import axios from "axios";
import { NavLink as Link, useNavigate } from "react-router-dom";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./navbarElements";

const Navbar = ({ visibillity, setVisibillity }) => {
    const logout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <Nav>
            <NavLink to="/home">
                <h1>ZenBuilds</h1>
            </NavLink>
            <Bars onClick={() => setVisibillity(true)} />
            <NavMenu value={visibillity}>
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/global">Global</NavLink>
                <NavLink to="/leaderboard">Leaderboard</NavLink>
                <NavLink to="/profile">Profile</NavLink>
            </NavMenu>

            {localStorage.getItem("token") ? (
                <NavBtn>
                    <NavBtnLink to="/" onClick={logout}>
                        Sign Out
                    </NavBtnLink>
                </NavBtn>
            ) : (
                <NavBtn>
                    <NavBtnLink to="/login">Sign In</NavBtnLink>
                </NavBtn>
            )}
        </Nav>
    );
};

export default Navbar;
