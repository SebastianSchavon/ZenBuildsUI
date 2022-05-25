import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FormGroup, FormInput, AuthPage, SubmitBtn, SignupDiv, ErrorMessage } from "./authElements";

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

    const [formErrors, setFormErrors] = useState({});
    const [enableSubmit, setEnableSubmit] = useState();



    const validate = () => {
        const errors = {};

        if (!authenticateRequest.Username) {
            errors.Username = "Username is required!";
            setEnableSubmit(false);
        } else if(authenticateRequest.Username){
            setEnableSubmit(true);
        }

        if (!authenticateRequest.Password) {
            errors.Password = "Password is required";
            setEnableSubmit(false);
        } else if(authenticateRequest.Password){
            setEnableSubmit(true);
        }

        return errors;
    };
    
    const onSubmit = async (event) => {
        event.preventDefault();
        setFormErrors(validate());
        if(enableSubmit == true){
            await login(authenticateRequest)
        }
        
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
                   
                    onChange={onChange}
                />
            <ErrorMessage>{formErrors.Username}</ErrorMessage>
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
            <ErrorMessage>{formErrors.Password}</ErrorMessage>  
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
            <ErrorMessage>{responseMessage}</ErrorMessage>
        </AuthPage>
    );
};

export default Login;
