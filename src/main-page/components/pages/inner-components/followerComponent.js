import { useEffect, useState } from "react";
import axios from "axios";
import {
  LeaderboardList,
  FollowerRow,
  NavLink,
  ProfileImage,
  Username,
  ZenPoints,
  UserDiv,
  FollowP,
  FollowDate,
  RegDate,
} from "./followerComponentElements";

const FollowerComponent = ({ date, follower }) => {
  useEffect(() => {
    console.log(follower);
  }, [null]);

  return (
    <div>
      <FollowerRow>
        <UserDiv>
          <ProfileImage
            src={`${process.env.PUBLIC_URL}/${follower.profileImage}`}
          />
          <Username>{follower.username}</Username>
        </UserDiv>
        <RegDate>
          <FollowP>Followed sience: </FollowP>
          <FollowDate>{date}</FollowDate>
        </RegDate>
      </FollowerRow>
    </div>
  );
};

export default FollowerComponent;
