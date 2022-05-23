import styled from "styled-components";
import {RadioGroup, Radio} from 'react-radio-group'

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



export const DescriptionTextArea = styled.textarea`
    align-items: center;
    margin: 5px;
    padding: 5px;
    min-width: 40vw;
    min-height: 3rem;
    text-align: left;

`;

export const Page = styled.section`
    margin: 2rem;
    flex-direction: row;

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