import styled from "styled-components";

export const FormGroup = styled.div`
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

export const FormInput = styled.input`
    align-items: center;
    margin-left: 5px;
`;

export const AuthPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const SubmitBtn = styled.button`
    border-radius: 4px;
    background: #256ce1;
    padding: 6px 12px;
    color: #fff;
    border: none;
    outline: none;

    &:hover{
        cursor: pointer;
    }
`;

export const SignupDiv = styled.div`
    margin: 5px;

    &:hover{
        cursor: pointer;
    }
`;



