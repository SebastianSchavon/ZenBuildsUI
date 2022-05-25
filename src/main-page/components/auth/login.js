import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    FormGroup,
    FormInput,
    AuthPage,
    SubmitBtn,
    SignupDiv,
    ErrorMessage,
} from "./authElements";

const Login = () => {
    const history = useNavigate();
    const [responseMessage, setResponseMessage] = useState();
    const [submitEnabled, setSubmitEnabled] = useState(true);

    useEffect(() => {
        getIp();
    }, [null]);

    const [authenticateRequest, setAuthenticateRequest] = useState({
        Username: "",
        Password: "",
    });

    const [userlogRequest, setUserlogRequest] = useState({
        Ip: "",
        Username:"",
        AuthSuccessful: false
    });

    const getIp = async () => {
        await axios
            .get("https://www.myexternalip.com/json", {
            })
            .then(function (response) {
                setUserlogRequest({
                    ...userlogRequest,
                    Ip: response.data.ip
                })
                
            })
            .catch(function (error) {

            });
    };

    const login = async (authenticateRequest) => {
        await axios
            .post("http://localhost:4000/users/authenticate", {
                Username: authenticateRequest.Username,
                Password: authenticateRequest.Password,
            })
            .then(function (response) {
                localStorage.setItem("token", response.data.token);
                logAuthentication(true);
                history("/home");
                window.location.reload(false);
            })
            .catch(function (error) {
                console.log("Error: ", error);
                logAuthentication(false);
            });
    };

    const logAuthentication = async (authSuccessful) => {
        await axios
            .post("http://localhost:4000/userlogs/logAuthentication", {
                ...userlogRequest,
                AuthSuccessful: authSuccessful,
            }).then(function (response) {
                console.log("Success:", response.data);
            })
            .catch(function (error) {
                console.log("Error: ", error);
            });
    };

    // updates authenticareRequest data on change
    const onChange = (e) => {
        setAuthenticateRequest({
            ...authenticateRequest,
            [e.target.id]: e.target.value,
        });
        setUserlogRequest({
            ...userlogRequest,
            [e.target.id]: e.target.value
        });
    };

    const [formErrors, setFormErrors] = useState({});

    const validate = () => {
        const errors = {};

        if (!authenticateRequest.Username) {
            errors.Username = "Username is required!";
            setSubmitEnabled(false);
        } else {
            setSubmitEnabled(true);
        }

        if (!authenticateRequest.Password) {
            errors.Password = "Password is required";
            setSubmitEnabled(false);
        } else {
            setSubmitEnabled(true);
        }

        return errors;
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormErrors(validate(authenticateRequest));

        if(submitEnabled){
            login(authenticateRequest);
            logAuthentication(userlogRequest);
        }

        
    };

    const signUp = () => {
        history("/register");
    };

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
