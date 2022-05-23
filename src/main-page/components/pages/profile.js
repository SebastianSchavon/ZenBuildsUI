import { useEffect, useState } from "react";
import {RadioGroup, Radio} from 'react-radio-group'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    FormGroup,
    FormInput,
    DescriptionTextArea,
    Page,
    ProfileSection,
    BuildsDiv,
    FollowersDiv,
    FollowingDiv,
    ListSection,
    SubmitBtn,
} from "./pages-elements/profileElements";

const Profile = () => {
    const [profile, setProfile] = useState({
        description: "",
        username: "",
        oldPassword: "",
        newPassword: "",
        profileImage: "",
    });

    const history = useNavigate();

    const [responseMessage, setResponseMessage] = useState();

    useEffect(() => {
        getProfile();
    }, [null]);

    const onChange = (e) => {
        setProfile({
            ...profile,
            [e.target.id]: e.target.value,
        });
    };

    const onBuildButtonClick = (e) => {
        history("/build")
    };

    const onRadioChange = (e) => {
        setProfile({
            ...profile,
            profileImage: e,
        });
        console.log(profile);
    };

    const onSubmit = async (e) => {
        console.log(localStorage.getItem("token"));
        await updateProfile();
    };

    const getProfile = async () => {
        await axios
            .get("http://localhost:4000/users/getAuthenticatedUser", {
                headers: {
                    "Content-Type": "application/json",
                    // use Token saved in localstorage
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then(function (response) {
                console.log("Success:", response.data);
                
                setProfile({
                    description: response.data.description,
                    username: response.data.username,
                });
                
            })
            .catch(function (error) {
                console.log(error);
                // display error message here
            });
    };

    const updateProfile = async () => {
        console.log(profile);
        await axios
            .patch("http://localhost:4000/users/update", profile, {
                headers: {
                    "Content-Type": "application/json",
                    // use Token saved in localstorage
                    Authorization: `bearer ${localStorage.getItem("token")}`
                },
            })
            .then(function (response) {
                console.log("Success:", response.data);
                setResponseMessage(response.message);
            })
            .catch(function (error) {
                console.log(error);
                setResponseMessage(error.message);
            });
    };

    return (
        <Page>
            <ProfileSection>
                <FormGroup className="form-group">
                    <label htmlFor="username">Username</label>
                    <FormInput
                        type="text"
                        placeholder={profile.username}
                        id="username"
                        defaultValue={profile.username}
                        onChange={onChange}
                    />
                </FormGroup>
                <FormGroup className="form-group">
                    <label htmlFor="description">Description</label>
                    <DescriptionTextArea
                        type="text"
                        placeholder={profile.description}
                        id="description"
                        defaultValue={profile.description}
                        onChange={onChange}
                    />
                </FormGroup>
                <FormGroup className="form-group">
                    <label htmlFor="oldPassword">Old Password</label>
                    <FormInput
                        type="text"
                        placeholder="*******"
                        id="oldPassword"
                        defaultValue={profile.oldPassword}
                        onChange={onChange}
                    />
                </FormGroup>
                <FormGroup className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <FormInput
                        type="text"
                        placeholder="*******"
                        id="newPassword"
                        defaultValue={profile.newPassword}
                        onChange={onChange}
                    />
                </FormGroup>
                <RadioGroup
                    name="race"
                    onChange={onRadioChange}
                    value={profile.profileImage}
                >
                    <Radio value="Terran-img.png" />
                    Terran
                    <Radio value="Protoss-img.png" />
                    Protoss
                    <Radio value="Zerg-img.png" />
                    Zerg
                </RadioGroup>

                <SubmitBtn
                    // button disabled when no value at name or email
                    disabled={
                        !profile.username &&
                        !profile.description &&
                        !profile.oldPassword &&
                        !profile.newPassword
                    }
                    onClick={onSubmit}
                >
                    Update profile
                </SubmitBtn>
                <p>{responseMessage}</p>
                <SubmitBtn

                    onClick={onBuildButtonClick}
                >
                    New Build Order
                </SubmitBtn>
            </ProfileSection>

            <ListSection>
                <BuildsDiv></BuildsDiv>
                <FollowingDiv></FollowingDiv>
                <FollowersDiv></FollowersDiv>
            </ListSection>
        </Page>
    );
};

export default Profile;
