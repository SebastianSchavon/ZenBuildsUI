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
    const [visibillity, setVisibillity] = useState(false);

    const onTitleClick = (e) => {
        setVisibillity(!visibillity);
    };

    useEffect(() => {
        console.log(follower);
    }, [null]);

    return (
        <div>
            <NavLink to={"/user/" + follower.id}>
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
            </NavLink>
        </div>
    );
};

export default FollowerComponent;
