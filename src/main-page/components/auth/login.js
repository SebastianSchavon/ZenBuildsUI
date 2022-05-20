import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "./auth";
import { FormGroup, FormInput, AuthPage, SubmitBtn, SignupDiv } from "./authElements";

const Login = () => {
    const history = useNavigate();



    const [authenticateRequest, setAuthenticateRequest] = useState({
        Username: "",
        Password: "",
    });

    // updates authenticareRequest data on change
    const onChange = (e) => {
        setAuthenticateRequest({
            ...authenticateRequest,
            [e.target.id]: e.target.value,
        });
    };

    const onSubmit = async (e) => {
        console.log(authenticateRequest)
        await Auth.login(authenticateRequest)
        history('/home')
    }

    const signUp = () => {
        history('/register')
    }


    return (
        <AuthPage>
            <FormGroup className="form-group">
                <label htmlFor="name">Username</label>
                <FormInput
                    type="text"
                    placeholder="Username"
                    id="Username"
                    value={authenticateRequest.Username}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup className="form-group">
                <label htmlFor="name">Password</label>
                <FormInput
                    type="password"
                    placeholder="Password"
                    id="Password"
                    value={authenticateRequest.Password}
                    onChange={onChange}
                />
            </FormGroup>
            <SubmitBtn
                // button disabled when no value at name or email
                disabled={!authenticateRequest.Username || !authenticateRequest.Password}
                onClick={onSubmit}
            >
                Submit
            </SubmitBtn>
            <SignupDiv className="signUp-div">
                <a onClick={signUp}>Sign up?</a>
            </SignupDiv>
        </AuthPage>
    );
};

export default Login;
