import { useEffect, useState } from "react";
import { RadioGroup, Radio } from "react-radio-group";
import { useLocation, useSearchParams, useParams } from "react-router-dom";
import axios from "axios";
import {
    FormGroup,
    FormInput,
    BuildTextArea,
    Page,
    BuildSection,
    SubmitBtn,
    VersusDiv,
    VS,
} from "./pages-elements/buildElements";

const Build = () => {
    const [profile, setProfile] = useState({
        title: "",
        playerRace: "",
        opponentRace: "",
        content: "",
    });

    const [responseMessage, setResponseMessage] = useState();

    const onChange = (e) => {
        setProfile({
            ...profile,
            [e.target.id]: e.target.value,
        });
    };

    const onPlayerRaceChange = (e) => {
        setProfile({
            ...profile,
            playerRace: e,
        });
    };
    const onOponentRaceRadioChange = (e) => {
        setProfile({
            ...profile,
            opponentRace: e,
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await createBuild(profile);
    };

    const createBuild = async () => {
        await axios
            .post("http://localhost:4000/builds/createBuild", profile, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${localStorage.getItem("token")}`,
                },
            })
            .then(function (response) {
                console.log("Success:", response.data);
                // setResponseMessage(response.data.message);
            })
            .catch(function (error) {
                console.log("Error: ", error);
                // setResponseMessage(error.message);
            });
    };

    return (
        <Page>
            <BuildSection>
                <form onSubmit={onSubmit}>
                    <FormGroup className="form-group">
                        <label htmlFor="title">Build Title</label>
                        <FormInput
                            type="text"
                            placeholder="Title"
                            id="title"
                            onChange={onChange}
                        />
                    </FormGroup>

                    <FormGroup className="form-group">
                        <label htmlFor="description">Build Order</label>
                        <BuildTextArea
                            type="text"
                            placeholder="Build Order"
                            id="content"
                            onChange={onChange}
                        />
                    </FormGroup>
                    <VersusDiv>
                        <RadioGroup
                            name="race"
                            onChange={onPlayerRaceChange}
                            value={profile.playerRace}
                        >
                            <Radio value="Terran" />
                            Terran
                            <Radio value="Protoss" />
                            Protoss
                            <Radio value="Zerg" />
                            Zerg
                        </RadioGroup>
                        <VS>VS</VS>
                        <RadioGroup
                            name="race2"
                            onChange={onOponentRaceRadioChange}
                            value={profile.opponentRace}
                        >
                            <Radio value="Terran" />
                            Terran
                            <Radio value="Protoss" />
                            Protoss
                            <Radio value="Zerg" />
                            Zerg
                            <Radio value="Any" />
                            Any
                        </RadioGroup>
                    </VersusDiv>

                    <SubmitBtn>Post Build Order</SubmitBtn>
                    <p>{responseMessage}</p>
                </form>
            </BuildSection>
        </Page>
    );
};

export default Build;
