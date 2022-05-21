import styled from "styled-components";
import { NavLink as Link } from 'react-router-dom'

export const NavLink = styled(Link)`
    text-decoration: none;
    color: black;


`

export const LeaderboardList = styled.ul`
    max-width: 40vw;
    margin-left: auto;
    margin-right: auto;

`;
export const LeaderboardRow = styled.li`
    display: flex;
    flex-direction: row;
    list-style: none;
    border-top: 1 ;
    border-bottom: 1px solid beige;
    border-top: 1px solid beige;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
    justify-content: space-between;
`;