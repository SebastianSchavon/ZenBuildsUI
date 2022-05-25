import { useEffect, useState } from "react";
import { RadioGroup, Radio } from "react-radio-group";
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
    ErrorMessage,
    ErrorMessageDiv
} from "./pages-elements/buildElements";

const Build = () => {
    const [build, setBuild] = useState({
        title: "",
        playerRace: "",
        opponentRace: "",
        content: "",
    });

    const [responseMessage, setResponseMessage] = useState();

    const [formErrors, setFormErrors] = useState({});

    const validate = () => {
        const errors = {};

        if (!build.title) {
            errors.Title = "Title is required!";
        } else if (build.title.length < 4) {
            errors.Title = "Title must be more than 4 characters";
        } else if (build.title.length > 12) {
            errors.Title = "Title cannot exceed more than 50 characters";
        } else {
        }

        if (!build.content) {
            errors.Content = "Build Order content is required!";
        } else if (build.content.length < 8) {
            errors.Content = "Build must be more than 8 characters";
        } else if (build.content.length > 250) {
            errors.Content = "Build cannot exceed more than 250 characters";
        } else {
        }

        if (!build.playerRace) {
            errors.PlayerRace = "Select player race!";
        }

        if (!build.opponentRace) {
            errors.OpponentRace = "Select opponent race!";
        }

        return errors;
    };

    const onChange = (e) => {
        setBuild({
            ...build,
            [e.target.id]: e.target.value,
        });
    };

    const onPlayerRaceChange = (e) => {
        setBuild({
            ...build,
            playerRace: e,
        });
    };
    const onOponentRaceRadioChange = (e) => {
        setBuild({
            ...build,
            opponentRace: e,
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormErrors(validate());
        await createBuild(build);
    };

    const createBuild = async () => {
        await axios
            .post("http://localhost:4000/builds/createBuild", build, {
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
                        <ErrorMessage>{formErrors.Title}</ErrorMessage>
                    </FormGroup>

                    <FormGroup className="form-group">
                        <label htmlFor="content">Build Order</label>
                        <BuildTextArea
                            type="text"
                            placeholder="Build Order"
                            id="content"
                            onChange={onChange}
                        />
                        <ErrorMessage>{formErrors.Content}</ErrorMessage>
                    </FormGroup>
                    <VersusDiv>
                        <RadioGroup
                            name="race"
                            onChange={onPlayerRaceChange}
                            value={build.playerRace}
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
                            value={build.opponentRace}
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
                    <ErrorMessageDiv>
                        <ErrorMessage>{formErrors.PlayerRace}</ErrorMessage>
                        <ErrorMessage>{formErrors.OpponentRace}</ErrorMessage>
                    </ErrorMessageDiv>

                    <SubmitBtn>Post Build Order</SubmitBtn>
                    <p>{responseMessage}</p>
                </form>
            </BuildSection>
        </Page>
    );
};

export default Build;
