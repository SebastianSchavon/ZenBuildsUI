import { useEffect, useState } from "react";
import axios from "axios";

import {
    LeaderboardList,
    LeaderboardRow,
    NavLink,
    ProfileImage,
    Username,
    ZenPoints,
} from "./pages-elements/leaderboardElements";

const Leaderboard = () => {
    useEffect(() => {
        getLeaderboard();
    }, [null]);

    const [Leaderboard, setLeaderboard] = useState([]);

    const getLeaderboard = async () => {
        await axios
            .get("http://localhost:4000/users/getTop20Users", {
                headers: {
                    "Content-Type": "application/json",
                    // use Token saved in localstorage
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then(function (response) {
                console.log("Success:", response.data);
                setLeaderboard(response.data);
            })
            .catch(function (error) {
                console.log(error);
                // display error message here
            });
    };

    return (
        <LeaderboardList>
            {Leaderboard.map((user) => (
                <NavLink to={"/user/" + user.id}>
                    <LeaderboardRow>
                        <ProfileImage  src={`${process.env.PUBLIC_URL}/${user.profileImage}`}/>
                        <Username>{user.username}</Username>
                        <ZenPoints>{user.zenPoints} ❤</ZenPoints>
                    </LeaderboardRow>
                </NavLink>
            ))}
        </LeaderboardList>
    );
};

export default Leaderboard;
