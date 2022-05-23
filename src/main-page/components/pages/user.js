import { useLocation, useSearchParams, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
    UserDiv,
    Page,
    ProfileImage,
    Username,
    ZenPoints,
    RegDate,
    FollowButton,
    Description
} from "./pages-elements/userElements.js";

const User = () => {
    useEffect(() => {
        getBuild();
    }, [null]);

    const [user, setUser] = useState([]);

    const { id } = useParams();

    const getBuild = async () => {
        await axios
            .get("http://localhost:4000/users/getUserByUserId/" + id, {
                headers: {
                    "Content-Type": "application/json",
                    // use Token saved in localstorage
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then(function (response) {
                console.log("Success:", response.data);
                setUser(response.data);
            })
            .catch(function (error) {
                console.log(error);
                // display error message here
            });
    };

    return (
        <Page>
            <UserDiv>
                <ProfileImage
                    src={`${process.env.PUBLIC_URL}/${user.profileImage}`}
                />
                <Username>{user.username}</Username>
                <Description>{user.description}</Description>
                <ZenPoints>ZenPonts: ❤{user.zenPoints}</ZenPoints>
                <RegDate>Registration date: {user.registerDate}</RegDate>
                <FollowButton>Follow</FollowButton>
            </UserDiv>
        </Page>
    );
};

export default User;
