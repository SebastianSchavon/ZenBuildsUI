import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "./auth";
import { FormGroup, FormInput, AuthPage, SubmitBtn } from "./authElements";

const Register = () => {
    const history = useNavigate();

    const [registerRequest, setRegisterRequest] = useState({
        Username: "",
        Password: "",
        ConfirmPassword: "",
        Species:""
    });

    // updates authenticareRequest data on change
    const onChange = (e) => {
        setRegisterRequest({
            ...registerRequest,
            [e.target.id]: e.target.value,
        });
    };


    const onSubmit = async (e) => {
        console.log(registerRequest)
        await Auth.register(registerRequest)
        history('/login')
    }
    return (
        <AuthPage>
            <FormGroup className="form-group">
                <label htmlFor="Username">Username</label>
                <FormInput
                    type="text"
                    placeholder="Username"
                    id="Username"
                    value={registerRequest.Username}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup className="form-group">
                <label htmlFor="Password">Password</label>
                <FormInput
                    type="password"
                    placeholder="Password"
                    id="Password"
                    value={registerRequest.Password}
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
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup className="form-group">
                <label htmlFor="Species">Species</label>
                <FormInput
                    type="text"
                    placeholder="Species"
                    id="Species"
                    value={registerRequest.Species}
                    onChange={onChange}
                />
            </FormGroup>
            <SubmitBtn
                className="btn btn-primary mt-2"
                // button disabled when no value at name or email
                disabled={!registerRequest.Username || !registerRequest.Password || !registerRequest.Species}
                onClick={onSubmit}
            >
                Submit
            </SubmitBtn>
        </AuthPage>
    );
}
 
export default Register;
