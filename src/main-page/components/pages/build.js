import { useEffect, useState } from "react";
import { useLocation, useSearchParams, useParams } from 'react-router-dom'
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

const Build = () => {
    
    const [build, setBuild] = useState([]);

    const { id } = useParams();

    const [visibillity, setVisibillity] = useState(false);

    useEffect(() => {
        
        console.log(id)
        
    }, [null]);

    const onSubmit = async (e) => {
        LikeBuild(e);
    };

    const onTitleClick = (e) => {
        setVisibillity(!visibillity);
    };


    const getBuild = async () => {
        await axios
            .get("http://localhost:4000/builds/getBuildById/1", {
                headers: {
                    "Content-Type": "application/json",
                    // use Token saved in localstorage
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then(function (response) {
                console.log("Success:", response.data);
                setBuild(response.data);
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
        <div>

        </div>
    );
};

export default Build;
