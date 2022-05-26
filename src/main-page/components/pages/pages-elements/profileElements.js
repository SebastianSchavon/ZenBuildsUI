import styled from "styled-components";
import { NavLink as Link } from 'react-router-dom'

export const NavLink = styled(Link)`
    text-decoration: none;
    color: black;


`

export const FormGroup = styled.div`
    margin: 5px;
    display: flex;
    flex-direction: column;
`;

export const FormInput = styled.input`
    align-items: center;
    margin-left: 5px;
    padding: 5px;
    margin: 5px;
`;

export const ErrorMessage = styled.p`
    margin: 5px;
    color: red;
    font-size: 80%;
`;
export const SuccessMessage = styled.p`
    margin: 5px;
    color: green;
    font-size: 80%;
`;

export const DescriptionTextArea = styled.textarea`
    align-items: center;
    margin: 5px;
    padding: 5px;
    min-width: 40vw;
    min-height: 5rem;
    text-align: left;
    resize: none;

`;

export const Page = styled.section`
    margin: 2rem;
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;
    max-width: 40vw;

`;

export const ProfileSection = styled.section`
    margin-left: auto;
    margin-right: auto;
`
export const BuildsDiv = styled.div`

`
export const FollowersDiv = styled.div`

`
export const FollowingDiv = styled.div`

`

export const ListSection = styled.section`
    display: flex;
    flex-direction: row;
`

export const SubmitBtn = styled.button`
    border-radius: 4px;
    background: #256ce1;
    padding: 6px 12px;
    color: #fff;
    border: none;
    outline: none;
    margin: 0.5rem;
    &:hover{
        cursor: pointer;
    }
`;