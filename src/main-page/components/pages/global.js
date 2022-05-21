import { useEffect, useState } from "react";
import axios from "axios";
import {
    BuildDiv,
    Content,
    Title,
    ContentHeader,
    Page,
    UserImg,
    UsernameDisplay,
    NavLink,
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
        setVisibillity(!visibillity);
    };

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

    const LikeBuild = async (buildId, data) => {
        console.log(buildId);
        await axios
            .put("http://localhost:4000/likes/toggleLike/" + buildId, data, {
                headers: {
                    "Content-Type": "application/json",
                    // use Token saved in localstorage
                    Authorization: `bearer ${localStorage.getItem("token")}`,
                },
            })
            .then(function (response) {
                console.log("Success:", response.data);
                
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <Page>
            {GlobalFeed.map((build, index) => (
                <div>
                    <BuildDiv>
                        <NavLink to={"/user/" + build.user.id}>
                            <UserImg src="https://www.logolynx.com/images/logolynx/be/beb78778027c8c3d423794c882afe582.jpeg" />
                        </NavLink>

                        <ContentHeader onClick={() => onTitleClick()}>
                            <NavLink to={"/user/" + build.user.id}>
                                <UsernameDisplay>
                                    {build.user.username}
                                </UsernameDisplay>
                            </NavLink>

                            <NavLink to={"/build/" + build.id}>
                                <Title>{build.title}</Title>
                            </NavLink>

                            <Title>
                                {build.playerRace} vs {build.opponentRace}
                            </Title>
                        </ContentHeader>
                        <Content value={visibillity}>{build.content}</Content>
                        <ContentHeader>
                            <Title>{build.published}</Title>
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
