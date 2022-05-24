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
    Description,
    BuildsDiv,
    FollowersDiv,
    FollowingDiv,
    ListSection,
    Hr,
    BuildsFollowers,
    FollowersP,
    BuildsP,
} from "./pages-elements/userElements.js";
import BuildComponent from "./inner-components/buildComponent";
import FollowerComponent from "./inner-components/followerComponent";

const User = () => {
    useEffect(() => {
        getUser();
    }, [null]);

    const [user, setUser] = useState([]);
    // const [userBuilds, setUserBuilds] = useState([]);
    const [userFollowers, setUserFollowers] = useState([]);
    const [userFollowing, setUserFollowing] = useState([]);

    const [visibillity, setVisibillity] = useState(false);
    const [followingFollowers, setFollowingFollowers] = useState(false);

    const [responseMessage, setResponseMessage] = useState();

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
                followCheck(response.data.id);
                // getUserBuilds(response.data.id);
                getUserFollowers(response.data.id);
                getUserFollowing(response.data.id);
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
                if (response.data) {
                    setVisibillity(true);
                } else {
                    setVisibillity(false);
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
                setResponseMessage(error.response.data);
            });
    };

    const removeFollow = async (id, data) => {
        await axios
            .delete("http://localhost:4000/followers/removeFollow/" + id, {
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

    const getUserFollowing = async (id) => {
        await axios
            .get("http://localhost:4000/followers/getUserFollowing/" + id, {
                headers: {
                    "Content-Type": "application/json",
                    // use Token saved in localstorage
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then(function (response) {
                console.log("Following:", response.data);
                setUserFollowing(response.data);
            })
            .catch(function (error) {
                console.log(error);
                // display error message here
            });
    };
    const getUserFollowers = async (id) => {
        await axios
            .get("http://localhost:4000/followers/getUserFollowers/" + id, {
                headers: {
                    "Content-Type": "application/json",
                    // use Token saved in localstorage
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then(function (response) {
                console.log("Followers:", response.data);
                setUserFollowers(response.data);
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
                <ZenPoints>ZenPonts: {user.zenPoints} ❤</ZenPoints>
                <RegDate>Registration date: {user.registerDate}</RegDate>

                {visibillity ? (
                    <FollowButton onClick={() => removeFollow(user.id)}>
                        Unfollow
                    </FollowButton>
                ) : (
                    <FollowButton onClick={() => addFollow(user.id)}>
                        Follow
                    </FollowButton>
                )}
                <p>{responseMessage}</p>
            </UserDiv>
            
            <BuildsFollowers>
                <FollowersP
                    value={followingFollowers}
                    onClick={() => setFollowingFollowers(true)}
                >
                    Followers
                </FollowersP>
                <BuildsP
                    value={followingFollowers}
                    onClick={() => setFollowingFollowers(false)}
                >
                    Following
                </BuildsP>
            </BuildsFollowers>

            <ListSection>
                {followingFollowers ? (
                    <FollowersDiv>
                    {userFollowers.map((follower, index) => (
                        <FollowerComponent date={follower.followDate} follower={follower.user_User} />
                    ))}
                </FollowersDiv>
                ) : (
                    <FollowersDiv>
                        {userFollowing.map((follower, index) => (
                            <FollowerComponent date={follower.followDate} follower={follower.follower_User} />
                        ))}
                    </FollowersDiv>
                )}
            </ListSection>
        </Page>
    );
};

export default User;
