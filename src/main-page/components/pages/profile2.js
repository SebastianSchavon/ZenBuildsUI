import { useEffect, useState } from "react";
// import {RadioGroup, Radio} from 'react-radio-group'
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
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

    const onRadioChange = (e) => {
        setProfile({
            ...profile,
            profileImage: e.target.value,
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
                    Authorization: `bearer ${localStorage.getItem("token")}`,
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
            <FormControl>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            p: 1,
                            m: 1,
                            bgcolor: "background.paper",
                            borderRadius: 1,
                        }}
                    >
                        <TextField
                            id="username"
                            label="Username"
                            value={profile.username}
                            onChange={onChange}
                            sx={{ margin: "0.8rem" }}
                            variant="standard"
                        />
                        <TextField
                            multiline
                            maxRows={10}
                            id="description"
                            label="Description"
                            value={profile.description}
                            onChange={onChange}
                            sx={{ margin: "0.8rem" }}
                            variant="standard"
                        />
                        <TextField
                            id="oldPassword"
                            label="Old Password"
                            placeholder="******"
                            onChange={onChange}
                            sx={{ margin: "0.8rem" }}
                            variant="standard"
                        />
                        <TextField
                            id="newPassword"
                            label="New Password"
                            placeholder="******"
                            onChange={onChange}
                            sx={{ margin: "0.8rem" }}
                            variant="standard"
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                        autoComplete="off"
                    >
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                            }}
                            onChange={onRadioChange}
                            value={profile.profileImage}
                        >
                            <FormControlLabel
                                value="Terran-img.png"
                                control={<Radio />}
                                label="Terran"
                                error
                            />
                            <FormControlLabel
                                value="Protoss-img.png"
                                control={<Radio />}
                                label="Protoss"
                                error
                            />
                            <FormControlLabel
                                value="Zerg-img.png"
                                control={<Radio />}
                                label="Zerg"
                                error
                            />
                        </RadioGroup>
                        <Button
                            variant="contained"
                            onSubmit={onSubmit}
                            sx={{ width: "200px" }}
                            disableElevation
                        >
                            Update
                        </Button>
                        {/* <SubmitBtn
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
                    </SubmitBtn> */}
                    </Box>
                </Box>
            </FormControl>
        </Page>
    );
};

export default Profile;
