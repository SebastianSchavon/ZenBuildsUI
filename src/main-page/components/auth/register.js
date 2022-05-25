import { useState } from "react";
import { RadioGroup, Radio } from "react-radio-group";
import axios from "axios";
import {
    FormGroup,
    FormInput,
    AuthPage,
    SubmitBtn,
    ErrorMessage,
} from "./authElements";

const Register = () => {
    const [responseMessage, setResponseMessage] = useState();
    const [registerRequest, setRegisterRequest] = useState({
        Username: "",
        Password: "",
        ConfirmPassword: "",
        ProfileImage: "",
    });

    const [formErrors, setFormErrors] = useState({});

    const validate = () => {
        const errors = {};
        const regex = /^[a-zA-Z0-9_]+$/i;

        if (!registerRequest.Username) {
            errors.Username = "Username is required!";
        } else if (!regex.test(registerRequest.Username)) {
            errors.Username = "Only letters, numbers and underscore allowed";
        } else if (registerRequest.Username.length < 3) {
            errors.Username = "Username must be more than 3 characters";
        } else if (registerRequest.Username.length > 12) {
            errors.Username = "Username cannot exceed more than 12 characters";
        } else {
        }

        if (!registerRequest.Password) {
            errors.Password = "Password is required";
        } else if (registerRequest.Password.length < 4) {
            errors.Password = "Password must be more than 4 characters";
        } else if (registerRequest.Password.length > 12) {
            errors.Password = "Password cannot exceed more than 12 characters";
        } else {
        }

        if (!registerRequest.ConfirmPassword) {
            errors.ConfirmPassword = "Confirm Password!";
        } else if (
            registerRequest.Password != registerRequest.ConfirmPassword
        ) {
            errors.ConfirmPassword = "Passwords dont match!";
        } else {
        }

        if (!registerRequest.ProfileImage) {
            errors.ProfileImage = "Select main race!";
        } else {
        }

        return errors;
    };

    const register = async (registerRequest) => {
        await axios
            .post("http://localhost:4000/users/register", registerRequest, {})
            .then(function (response) {
                console.log("Success:", response.data);
                // setResponseMessage(response.data.message);
            })
            .catch(function (error) {
                console.log(error.response.data);
                // setResponseMessage(error.response.data);
            });
    };

    const onChange = (e) => {
        setRegisterRequest({
            ...registerRequest,
            [e.target.id]: e.target.value,
        });
        
    };
    const onRadioChange = (e) => {
        setRegisterRequest({
            ...registerRequest,
            ProfileImage: e,
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormErrors(validate());

        await register(registerRequest);
    };
    return (
        <AuthPage>
            <form onSubmit={onSubmit}>
                <FormGroup className="form-group">
                    <label htmlFor="Username">Username</label>
                    <FormInput
                        type="text"
                        placeholder="Username"
                        id="Username"
                        value={registerRequest.Username}
                        onChange={onChange}
                    />
                    <ErrorMessage>{formErrors.Username}</ErrorMessage>
                </FormGroup>
                <FormGroup className="form-group">
                    <label htmlFor="Password">Password</label>
                    <FormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        id="Password"
                        value={registerRequest.Password}
                        onChange={onChange}
                    />
                    <ErrorMessage>{formErrors.Password}</ErrorMessage>
                </FormGroup>
                <FormGroup className="form-group">
                    <label htmlFor="Password">Confirm Password</label>
                    <FormInput
                        type="password"
                        placeholder="Password"
                        id="ConfirmPassword"
                        value={registerRequest.ConfirmPassword}
                        onChange={onChange}
                    />
                    <ErrorMessage>{formErrors.ConfirmPassword}</ErrorMessage>
                </FormGroup>
                <RadioGroup
                    name="race"
                    onChange={onRadioChange}
                    value={registerRequest.ProfileImage}
                    id="ProfileImage"
                >
                    <Radio value="Terran-img.png" name="race" />
                    Terran
                    <Radio value="Protoss-img.png" name="race" />
                    Protoss
                    <Radio value="Zerg-img.png" name="race" />
                    Zerg
                </RadioGroup>
                <ErrorMessage>{formErrors.ProfileImage}</ErrorMessage>
                <SubmitBtn>
                    Register
                </SubmitBtn>
                <ErrorMessage>{responseMessage}</ErrorMessage>
            </form>
        </AuthPage>
    );
};

export default Register;
