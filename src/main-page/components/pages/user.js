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
  ErrorMessage,
  NavLink,
} from "./pages-elements/userElements.js";
import BuildComponent from "./inner-components/buildComponent";
import FollowerComponent from "./inner-components/followerComponent";

const User = () => {
  useEffect(() => {
    getUser();
  }, [null]);

  const [user, setUser] = useState([]);

  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);

  const [visibillity, setVisibillity] = useState(false);
  const [followingFollowers, setFollowingFollowers] = useState(true);

  const [errorMessage, setErrorMessage] = useState();

  const { id } = useParams();

  const onUserClick = (e) => {
    window.location.reload(true);
  };

  const getUser = async () => {
    await axios
      .get("http://localhost:4000/users/getUserByUserId/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        console.log("Success:", response.data);
        setUser(response.data);
        followCheck(response.data.id);
        getUserFollowers(response.data.id);
        getUserFollowing(response.data.id);
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  };

  const followCheck = async (id) => {
    await axios
      .get("http://localhost:4000/followers/followCheck/" + id, {
        headers: {
          "Content-Type": "application/json",
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
        console.log("Error: ", error);
      });
  };

  const addFollow = async (id, data) => {
    await axios
      .post("http://localhost:4000/followers/addFollow/" + id, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        console.log("Success:", response.data);
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
        setErrorMessage(error.response.data);
      });
  };

  const removeFollow = async (id, data) => {
    await axios
      .delete("http://localhost:4000/followers/removeFollow/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        console.log("Success:", response.data);
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  };

  const getUserFollowing = async (id) => {
    await axios
      .get("http://localhost:4000/followers/getUserFollowing/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        console.log("Following:", response.data);
        setUserFollowing(response.data);
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  };
  const getUserFollowers = async (id) => {
    await axios
      .get("http://localhost:4000/followers/getUserFollowers/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        console.log("Followers:", response.data);
        setUserFollowers(response.data);
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  };

  return (
    <Page>
      <UserDiv>
        <ProfileImage src={`${process.env.PUBLIC_URL}/${user.profileImage}`} />
        <Username>{user.username}</Username>
        <Description>{user.description}</Description>
        <ZenPoints>ZenPonts: {user.zenPoints} ❤</ZenPoints>
        <RegDate>Registration date: {user.registerDate}</RegDate>

        {visibillity ? (
          <FollowButton onClick={() => removeFollow(user.id)}>
            Unfollow
          </FollowButton>
        ) : (
          <FollowButton onClick={() => addFollow(user.id)}>Follow</FollowButton>
        )}
        <ErrorMessage>{errorMessage}</ErrorMessage>
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
              <NavLink to={"/user/" + follower.user_User.id}>
                <FollowerComponent
                  date={follower.followDate}
                  follower={follower.user_User}
                />
              </NavLink>
            ))}
          </FollowersDiv>
        ) : (
          <FollowersDiv>
            {userFollowing.map((follower, index) => (
              <NavLink to={"/user/" + follower.follower_User.id}>
                <FollowerComponent
                  date={follower.followDate}
                  follower={follower.follower_User}
                />
              </NavLink>
            ))}
          </FollowersDiv>
        )}
      </ListSection>
    </Page>
  );
};

export default User;
