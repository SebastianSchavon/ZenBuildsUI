import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

export const NavLink = styled(Link)`
    text-decoration: none;
    color: black;
`;

export const BuildDiv = styled.div`
    margin-top: 10px;
    padding: 1rem;
    max-width: 60vw;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid beige;
    text-align: center;
`;

export const UserDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

export const ExpandButton = styled.button`
    background: 0;
    border: 0;
    &:hover {
        cursor: pointer;
    }
`;

export const Content = styled.p`
    white-space: pre-wrap;
    line-height: 140%;
    letter-spacing: 1.5px;
    font-size: 110%;
    text-align: start;
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: auto;
    margin-right: auto;
    transition: 0.3s ease-in-out;
    opacity: ${(props) => (props.value ? "100%" : "0")};
    min-height: ${(props) => (props.value ? "40vh" : "0")};
    height: ${(props) => (props.value ? "100%" : "0")};
    padding: ${(props) => (props.value ? "1.5rem" : "0")};
`;

export const Title = styled.p`
    font-size: 80%;
    margin-top: 0.5rem;
    font-weight: bold;
    

    &:hover {
        cursor: pointer;
    }
`;

export const BuildInfo = styled.p`
    font-size: 80%;
    margin-top: 0.5rem;
    margin-right: 2rem;
`;

export const LikesCount = styled.p`
    margin-top: 0.5rem;
    color:  #15cdfc;

    &:hover {
        cursor: pointer;
    }
`;

export const UsernameDisplay = styled.p`
    font-size: 80%;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
`;

export const ContentHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const Page = styled.section``;

export const Hr = styled.hr`
    width: 40vw;
    border: 1px solid #e0cfcc;
`;

export const UserImg = styled.img`
    height: 1.8rem;
    width: 1.8rem;
    border-radius: 50%;
`;

export const UserHeader = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    text-align: center;
`;
