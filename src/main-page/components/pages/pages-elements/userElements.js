import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

export const UserDiv = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 1rem;
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
