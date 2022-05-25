import { useEffect, useState } from "react";
import axios from "axios";
import {
    BuildDiv,
    Content,
    Title,
    ContentHeader,
    UserImg,
    UsernameDisplay,
    NavLink,
    BuildInfo,
    UserDiv,
    LikesCount,
    ExpandButton,
} from "./buildComponentElements";

const BuildComponent = ({ build }) => {
    const [visibillity, setVisibillity] = useState(false);

    const onSubmit = async (e) => {
        LikeBuild(e);
    };

    const onTitleClick = (e) => {
        setVisibillity(!visibillity);
    };

    useEffect(() => {
       
    }, [null]);

    const LikeBuild = async (buildId, data) => {
        console.log(buildId);
        await axios
            .put("http://localhost:4000/likes/toggleLike/" + buildId, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${localStorage.getItem("token")}`,
                },
            })
            .then(function (response) {
                console.log("Success:", response.data);
            })
            .catch(function (error) {
                console.log("Error:", error);
            });
    };

    return (
        <BuildDiv>
            <ContentHeader>
                <UserDiv>
                    <NavLink to={"/user/" + build.user.id}>
                        <UserImg
                            src={`${process.env.PUBLIC_URL}/${build.user.profileImage}`}
                        />
                    </NavLink>
                    <NavLink to={"/user/" + build.user.id}>
                        <UsernameDisplay>{build.user.username}</UsernameDisplay>
                    </NavLink>
                </UserDiv>
                <ExpandButton onClick={() => onTitleClick()}>
                    expand
                </ExpandButton>
            </ContentHeader>
            <Title>{build.title}</Title>
            <Content value={visibillity}>{build.content}</Content>
            <ContentHeader>
                <BuildInfo>{build.published}</BuildInfo>

                <BuildInfo>
                    {build.playerRace} vs {build.opponentRace}
                </BuildInfo>
                <LikesCount onClick={() => onSubmit(build.id)}>
                    ❤ {build.likesCount}
                </LikesCount>
            </ContentHeader>
        </BuildDiv>
    );
};

export default BuildComponent;
