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
        getUser();
    }, [null]);

    const [user, setUser] = useState([]);
    const [visibillity, setVisibillity] = useState(false);

    const { id } = useParams();

    const getUser = async () => {
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
                followCheck(response.data.id)
            })
            .catch(function (error) {
                console.log(error);
                // display error message here
            });
    };

    const followCheck = async (id) => {
        await axios
            .get("http://localhost:4000/followers/followCheck/" + id, {
                headers: {
                    "Content-Type": "application/json",
                    // use Token saved in localstorage
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then(function (response) {
                console.log("Success:", response.data);
                if(response.data){
                    setVisibillity(true)
                }else{
                    setVisibillity(false)
                }
               
            })
            .catch(function (error) {
                console.log(error);
                // display error message here
            });
    };

    const addFollow = async (id, data) => {
        
        await axios
            .post("http://localhost:4000/followers/addFollow/" + id, data, {
                headers: {
                    "Content-Type": "application/json",
                    // use Token saved in localstorage
                    Authorization: `bearer ${localStorage.getItem("token")}`,
                },
            })
            .then(function (response) {
                console.log("Success:", response.data);
                window.location.reload(false);
            })
            .catch(function (error) {
                console.log(error);
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
                <ZenPoints>ZenPonts: {user.zenPoints} ❤</ZenPoints>
                <RegDate>Registration date: {user.registerDate}</RegDate>
                
                {visibillity ? (
                <FollowButton onClick={() => addFollow(user.id)}>Unfollow</FollowButton>
            ) : (
                <FollowButton onClick={() => addFollow(user.id)}>Follow</FollowButton>
            )}
            </UserDiv>
        </Page>
    );
};

export default User;
