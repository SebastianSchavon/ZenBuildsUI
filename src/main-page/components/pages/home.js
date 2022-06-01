import { useEffect, useState } from "react";
import axios from "axios";
import {
    Page
} from "./pages-elements/global-homeElements";
import BuildComponent from "./inner-components/buildComponent";

const Home = () => {
    const [HomeFeed, setHomeFeed] = useState([]);

    useEffect(() => {
        getHomeFeed();
    }, [null]);

    const getHomeFeed = async () => {
        await axios
            .get("http://localhost:4000/builds/getAuthenticatedUserFeed", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then(function (response) {
                console.log("Success:", response.data);
                setHomeFeed(response.data);
            })
            .catch(function (error) {
                console.log("Error: ", error);

            });
    };

    return (
        <Page>
            {HomeFeed.map((build, index) => (
                <BuildComponent key={index} build = {build}/>
            ))}
        </Page>
    );
};

export default Home;
