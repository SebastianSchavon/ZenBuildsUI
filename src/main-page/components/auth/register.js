import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RadioGroup, Radio } from "react-radio-group";
import axios from "axios";
import { FormGroup, FormInput, AuthPage, SubmitBtn } from "./authElements";

const Register = () => {
    const history = useNavigate();
    const [responseMessage, setResponseMessage] = useState();
    const [registerRequest, setRegisterRequest] = useState({
        Username: "",
        Password: "",
        ConfirmPassword: "",
        Race: "",
        ProfileImage: "",
    });

    // const [errorMessage, setErrorMessage] = useState({
    //     Username: " ",
    //     Password: " "   
    // });

    // const checkErrorMessage = (errorMessage) => {
    //     if(errorMessage.hasOwnProperty("ConfirmPassword")){
    //         setErrorMessage({Password: errorMessage.ConfirmPassword})
    //     }
    //     if(errorMessage.hasOwnProperty("Username")){
    //         setErrorMessage({Username: errorMessage.Username})
    //     }
    // }

    const register = async (registerRequest) => {
        await axios
            .post("http://localhost:4000/users/register", registerRequest, {})
            .then(function (response) {
                console.log("Success:", response.data);
                history("/login");
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    };

    // updates authenticareRequest data on change
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
                        required
                        onChange={onChange}
                    />
                </FormGroup>
                <FormGroup className="form-group">
                    <label htmlFor="Password">Password</label>
                    <FormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        id="Password"
                        value={registerRequest.Password}
                        required
                        onChange={onChange}
                    />
                </FormGroup>
                <FormGroup className="form-group">
                    <label htmlFor="Password">Confirm Password</label>
                    <FormInput
                        type="password"
                        placeholder="Password"
                        id="ConfirmPassword"
                        value={registerRequest.ConfirmPassword}
                        required
                        onChange={onChange}
                    />
                </FormGroup>
                <RadioGroup
                    name="race"
                    onChange={onRadioChange}
                    value={registerRequest.ProfileImage}
                    required
                >
                    <Radio value="Terran-img.png" name="race" required/>
                    Terran
                    <Radio value="Protoss-img.png" name="race" required/>
                    Protoss
                    <Radio value="Zerg-img.png" name="race" required/>
                    Zerg
                </RadioGroup>
                <SubmitBtn
                    className="btn btn-primary mt-2"
                    // button disabled when no value at name or email
                    // disabled={
                    //     !registerRequest.Username &&
                    //     !registerRequest.Password &&
                    //     !registerRequest.Species &&
                    //     !registerRequest
                    // }
                    
                >
                    Register
                </SubmitBtn>
                <p>{responseMessage}</p>
            </form>
        </AuthPage>
    );
};

export default Register;
