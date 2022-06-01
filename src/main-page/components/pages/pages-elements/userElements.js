import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

export const NavLink = styled(Link)`
    text-decoration: none;
    color: black;
`;

export const UserDiv = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 1rem;
    max-width: 60vw;
    margin-left: auto;
    margin-right: auto;
`;

export const ProfileImage = styled.img`
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    margin-left: auto;
    margin-right: auto;
`;

export const Username = styled.p`
    margin: 1rem;
    font-weight: bold;
`;
export const ZenPoints = styled.p`
    margin: 0.2rem;
`;
export const ZPan = styled.span`
    
    color:  #15cdfc;
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

export const ProfileSection = styled.section`
    margin-left: auto;
    margin-right: auto;
`
export const Hr = styled.hr`
    margin-top: 5rem;
    margin-bottom: 2.5rem;
    
`

export const BuildsDiv = styled.div`
    text-align: center;
`
export const FollowersDiv = styled.div`

`
export const FollowingDiv = styled.div`

`
export const ListSection = styled.section`
    display: flex;
    flex-direction: row;
    
    margin-left: auto;
    margin-right: auto;
`

export const BuildsFollowers = styled.div`
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    display: flex;
    margin-top: 8rem;


`
export const FollowersP = styled.p`
    opacity: ${props => props.value ? '100%' : '40%'};
    margin-right: 2.5rem;

    &:hover {
        cursor: pointer;
    }
`;

export const BuildsP = styled.p`
    opacity: ${props => props.value ? '40%' : '100%'};
    margin-left: 2.5rem;

    &:hover {
        cursor: pointer;
    }
`;

export const ErrorMessage = styled.p`
    margin: 5px;
    color: red;
    font-size: 80%;
`;
