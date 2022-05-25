import { useEffect, useState } from "react";
import axios from "axios";
import {
    Page
} from "./pages-elements/global-homeElements";
import BuildComponent from "./inner-components/buildComponent";

const Global = () => {
    const [GlobalFeed, setGlobalFeed] = useState([]);

    useEffect(() => {
        getGlobalFeed();
    }, [null]);

    const getGlobalFeed = async () => {
        await axios
            .get("http://localhost:4000/builds/getAllBuilds", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then(function (response) {
                console.log("Success:", response.data);
                setGlobalFeed(response.data);
            })
            .catch(function (error) {
                console.log("Error: ",error);
            });
    };

    return (
        <Page>
            {GlobalFeed.map((build, index) => (
                <BuildComponent build = {build}/>
            ))}
        </Page>
    );
};

export default Global;
