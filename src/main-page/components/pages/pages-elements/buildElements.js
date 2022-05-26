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

export const BuildTextArea = styled.textarea`
    align-items: center;
    margin: 5px;
    padding: 5px;
    min-width: 40vw;
    min-height: 30rem;
    text-align: LEFT;

`;

export const Page = styled.section`
    margin: 2rem;
    flex-direction: row;

`;

export const BuildSection = styled.section`
    margin-left: auto;
    margin-right: auto;
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

export const VersusDiv = styled.div`
    margin: 1rem;
    display: flex;
    flex-direction: row;

`;


export const VS = styled.p`
    margin-left: 2rem;
    margin-right: 2rem;
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

export const ErrorMessageDiv = styled.div`
    display: flex;
    flex-direction: row;
`;
