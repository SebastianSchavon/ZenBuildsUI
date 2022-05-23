import {
    SidebarContainer,
    Icon,
    CloseIcon,
    SidebarLink,
    SidebarMenu,
    SidebarWrapper,
} from "./sidebarElements";
import { useState } from "react";
import axios from "axios";


const Sidebar = ({visibillity, setVisibillity}) => {
    
    
    const logout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <SidebarContainer value={visibillity}>
            <Icon>
                <CloseIcon onClick={() => setVisibillity(false)} />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu onClick={() => setVisibillity(false)}>
                    <SidebarLink to="/home" >Home</SidebarLink>
                    <SidebarLink to="/global">Global</SidebarLink>
                    <SidebarLink to="/leaderboard">Leaderboard</SidebarLink>
                    <SidebarLink to="/profile">Profile</SidebarLink>
                    {localStorage.getItem("token") ? (
                        <SidebarLink to="/" onClick={logout}>
                            Sign Out
                        </SidebarLink>
                    ) : (
                        <SidebarLink to="/login">Sign In</SidebarLink>
                    )}
                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>
    );
};

export default Sidebar;
