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



export const UserDiv = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
`;

export const ProfileImage = styled.img`
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
`;

export const Username = styled.p`
    margin: 1rem;
    font-weight: bold;
`;
export const ZenPoints = styled.p`
    margin: 1rem;
`;
export const RegDate = styled.p`
    margin: 0.2rem;
`;
export const Description = styled.p`
    padding: 1rem;
    
    font-style: italic;
`;

export const FollowButton = styled.button`
    border-radius: 4px;
    background: #256ce1;
    padding: 6px 12px;
    color: #fff;
    border: none;
    outline: none;
    width: 50%;
    margin-top: 1rem;
    margin-left: auto;
    margin-right: auto;

    &:hover{
        cursor: pointer;
    }
`;

export const Page = styled.section`
    display: flex;
    flex-direction: column;
`;
