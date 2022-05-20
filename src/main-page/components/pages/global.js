import { useEffect, useState } from "react";
import axios from "axios";
import {
    BuildDiv,
    Content,
    Title,
    ContentHeader,
    Page,
    UserImg,
    UsernameDisplay
} from "./pages-elements/global-homeElements";

const Global = () => {
    const [GlobalFeed, setGlobalFeed] = useState([]);
    const [visibillity, setVisibillity] = useState(false);
    useEffect(() => {
        getGlobalFeed();
    }, [null]);

    const onSubmit = async (e) => {
        LikeBuild(e);
    };

    const onTitleClick = (e) => {
        setVisibillity(!visibillity)
    }

    const getGlobalFeed = async () => {
        await axios
            .get("http://localhost:4000/builds/getAllBuilds", {
                headers: {
                    "Content-Type": "application/json",
                    // use Token saved in localstorage
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then(function (response) {
                console.log("Success:", response.data);
                setGlobalFeed(response.data);
            })
            .catch(function (error) {
                console.log(error);
                // display error message here
            });
    };

    const LikeBuild = async (buildId) => {
        await axios
            .put("http://localhost:4000/likes/toggleLike/" + buildId, {
                headers: {
                    // use Token saved in localstorage
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then(function (response) {
                console.log("Success:", response.data);
            })
            .catch(function (error) {
                console.log(error);
                console.log(localStorage.getItem("token"));
                console.log(
                    "http://localhost:4000/likes/toggleLike/" + buildId
                );
                // display error message here
            });
    };

    return (
        <Page>
            {GlobalFeed.map((build, index) => (
                <div>
                    <BuildDiv >
                        <UserImg  src="https://www.logolynx.com/images/logolynx/be/beb78778027c8c3d423794c882afe582.jpeg" />
                        <ContentHeader onClick={() => onTitleClick()} >
                            <UsernameDisplay>
                                {build.user.username} 
                            </UsernameDisplay>
                            <Title >
                                {build.title}
                            </Title>
                            <Title>
                                {build.playerRace} vs {build.opponentRace}
                            </Title>
                        </ContentHeader>
                        <Content key={index} value={visibillity}>{build.content}</Content>
                        <ContentHeader>
                            <Title>
                            {build.published}
                            </Title>
                            <Title onClick={() => onSubmit(build.id)}>
                            ❤ {build.likesCount}
                            </Title>
                        </ContentHeader>
                    </BuildDiv>
                </div>
            ))}
        </Page>
    );
};

export default Global;
