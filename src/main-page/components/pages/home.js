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
                    // use Token saved in localstorage
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then(function (response) {
                console.log("Success:", response.data);
                setHomeFeed(response.data);
            })
            .catch(function (error) {
                console.log("Error: ", error);
                // display error message here
            });
    };

    return (
        <Page>
            {HomeFeed.map((build, index) => (
                <BuildComponent build = {build}/>
            ))}
        </Page>
    );
};

export default Home;
