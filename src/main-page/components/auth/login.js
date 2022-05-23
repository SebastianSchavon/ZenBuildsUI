import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FormGroup, FormInput, AuthPage, SubmitBtn, SignupDiv } from "./authElements";

const Login = () => {
    const history = useNavigate();
    const [responseMessage, setResponseMessage] = useState();


    const [authenticateRequest, setAuthenticateRequest] = useState({
        Username: "",
        Password: "",
    });


    const login = async (authenticateRequest) => {
        await axios.post('http://localhost:4000/users/authenticate', {
            Username: authenticateRequest.Username,
            Password: authenticateRequest.Password
          })
          .then(function (response) {
            localStorage.setItem('token', response.data.token);
            
            history('/home')
            window.location.reload(false);
          })
          .catch(function (error) {
            console.log(error)
            setResponseMessage(error.response.data);
          });
    };

    // updates authenticareRequest data on change
    const onChange = (e) => {
        setAuthenticateRequest({
            ...authenticateRequest,
            [e.target.id]: e.target.value,
        });
    };


    
    const onSubmit = async (event) => {
        event.preventDefault();
        await login(authenticateRequest)
    };

    const signUp = () => {
        history('/register')
    }


    return (
        <AuthPage>
            <form onSubmit={onSubmit}>
            <FormGroup className="form-group">
                <label htmlFor="name">Username</label>
                <FormInput
                    type="text"
                    placeholder="Username"
                    id="Username"
                    value={authenticateRequest.Username}
                    required
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
                    required
                    onChange={onChange}
                />
            </FormGroup>
            <SubmitBtn
                // button disabled when no value at name or email
                // disabled={!authenticateRequest.Username || !authenticateRequest.Password}
            >
                Login
            </SubmitBtn>
            </form>
            
           
            <SignupDiv className="signUp-div">
                <a onClick={signUp}>Sign up?</a>
            </SignupDiv>
            <p>{responseMessage}</p>
        </AuthPage>
    );
};

export default Login;
