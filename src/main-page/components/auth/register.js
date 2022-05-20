import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {RadioGroup, Radio} from 'react-radio-group'
import Auth from "./auth";
import { FormGroup, FormInput, AuthPage, SubmitBtn } from "./authElements";

const Register = () => {
    const history = useNavigate();

    const [registerRequest, setRegisterRequest] = useState({
        Username: "",
        Password: "",
        ConfirmPassword: "",
        Race:"",
        ProfileImage: "",
    });

    const setProfileImage = () => {
        if(registerRequest.Race == 'Terran'){
            setRegisterRequest({
                ProfileImage: "src/assets/profileImgs/terran-img.png"
            })
        }else if(registerRequest.Race == 'Protoss'){
            setRegisterRequest({
                ProfileImage: "src/assets/profileImgs/protoss-img.png"
            })
        }else if(registerRequest.Race == 'Zerg'){
            setRegisterRequest({
                ProfileImage: "src/assets/profileImgs/zerg-img.png"
            })
        }
    }

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
            Race: e,
            ProfileImage: `src/assets/profileImgs/${e}-img.png`

        });
        console.log(registerRequest)
    };

    const onSubmit = async (e) => {
        setProfileImage()
        
        await Auth.register(registerRequest)
        history('/login')
        console.log(registerRequest)
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
                    name="password"
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
            <RadioGroup
                    name="race"
                    onChange={onRadioChange}
                    value={registerRequest.ProfileImage} 
                >
                    <Radio value="Terran" name="Terran" />
                    Terran
                    <Radio value="Protoss" name="Protoss"/>
                    Protoss
                    <Radio value="Zerg" name="Zerg"/>
                    Zerg
                </RadioGroup>
            <SubmitBtn
                className="btn btn-primary mt-2"
                // button disabled when no value at name or email
                disabled={!registerRequest.Username && !registerRequest.Password && !registerRequest.Species && !registerRequest}
                onClick={onSubmit}
            >
                Submit
            </SubmitBtn>
        </AuthPage>
    );
}
 
export default Register;
