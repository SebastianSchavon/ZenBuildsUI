import { useEffect, useState } from "react";
import axios from "axios";
import {
    Page
} from "./pages-elements/global-homeElements";
import BuildComponent from "./inner-components/buildComponent";

const Home = () => {
    const [HomeFeed, setHomeFeed] = useState([]);
    // const [LikeCount, setLikeCount] = useState([]);
    // const [visibillity, setVisibillity] = useState(false);
    useEffect(() => {
        getHomeFeed();
    }, [null]);

    // const onSubmit = async (e) => {
    //     LikeBuild(e);
    // };
    // const onTitleClick = (e) => {
    //     setVisibillity(!visibillity);
    // };

    const getHomeFeed = async () => {
        await axios
            .get("http://localhost:4000/builds/getAuthenticatedUserFeed", {
                headers: {
                    "Content-Type": "application/json",
                    // use Token saved in localstorage
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then(function (response) {
                console.log("Success:", response.data);
                setHomeFeed(response.data);
            })
            .catch(function (error) {
                console.log(error);
                // display error message here
            });
    };

    // const LikeBuild = async (buildId, data) => {
    //     console.log(buildId);
    //     await axios
    //         .put("http://localhost:4000/likes/toggleLike/" + buildId, data, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 // use Token saved in localstorage
    //                 Authorization: `bearer ${localStorage.getItem("token")}`,
    //             },
    //         })
    //         .then(function (response) {
    //             console.log("Success:", response.data);
    //             setLikeCount(response.data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // };

    return (
        <Page>
            {HomeFeed.map((build, index) => (
                <BuildComponent build = {build}/>
            ))}
        </Page>
    );
};

export default Home;
