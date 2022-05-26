import { useEffect, useState } from "react";
import { RadioGroup, Radio } from "react-radio-group";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FormGroup,
  FormInput,
  DescriptionTextArea,
  Page,
  ProfileSection,
  SubmitBtn,
  ErrorMessage,
  SuccessMessage,
  NavLink,
} from "./pages-elements/profileElements";

const Profile = () => {
  const [profile, setProfile] = useState({
    description: "",
    username: "",
    oldPassword: "",
    newPassword: "",
    profileImage: "",
  });
  const [profileId, setProfileId] = useState();
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const validate = (values) => {
    let isValue = true;
    const errors = {};
    const regex = /^[a-zA-Z0-9_]+$/i;

    if (!profile.username && profile.username != profile.username) {
      errors.Username = "Username is required!";
      isValue = false;
    } else if (!regex.test(profile.username)) {
      errors.Username = "Only letters, numbers and underscore allowed";
      isValue = false;
    } else if (profile.username.length < 3) {
      errors.Username = "Username must be more than 3 characters";
      isValue = false;
    } else if (profile.username.length > 12) {
      errors.Username = "Username cannot exceed more than 12 characters";
      isValue = false;
    } 

    if (profile.newPassword || profile.oldPassword) {
      if (!profile.oldPassword) {
        errors.OldPassword = "Old password is required";
        isValue = false;
      }
      if (!profile.newPassword) {
        errors.NewPassword = "New password is required";
        isValue = false;
      } else if (profile.newPassword.length < 4) {
        errors.NewPassword = "Password must be more than 4 characters";
        isValue = false;
      } else if (profile.newPassword.length > 12) {
        errors.NewPassword = "Password cannot exceed more than 12 characters";
        isValue = false;
      } 
    }

    if (!profile.profileImage) {
      errors.ProfileImage = "Select main race!";
      isValue = false;
    }

    setFormErrors(errors);

    return isValue;
  };

  const history = useNavigate();

  

  useEffect(() => {
    getProfile();
  }, [null]);

  const onChange = (e) => {
    setProfile({
      ...profile,
      [e.target.id]: e.target.value,
    });
  };

  const onBuildButtonClick = (e) => {
    history("/build");
  };

  const onRadioChange = (e) => {
    setProfile({
      ...profile,
      profileImage: e,
    });
    console.log(profile);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (validate(profile)) {
      updateProfile();
    }
  };

  const getProfile = async () => {
    await axios
      .get("http://localhost:4000/users/getAuthenticatedUser", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        console.log("Success:", response.data);

        setProfile({
          description: response.data.description,
          username: response.data.username,
        });
        setProfileId(response.data.id);
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  };

  const updateProfile = async () => {
    console.log(profile);
    await axios
      .patch("http://localhost:4000/users/update", profile, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        console.log("Success:", response.data);
        setSuccessMessage(response.data.message);
        setErrorMessage("");
      })
      .catch(function (error) {
        console.log("Error: ", error);
        setErrorMessage(error.message);
        setSuccessMessage("");
      });
  };

  return (
    <Page>
      <ProfileSection>
        <form onSubmit={onSubmit}>
          <FormGroup className="form-group">
            <label htmlFor="username">Username</label>
            <FormInput
              type="text"
              placeholder={profile.username}
              id="username"
              defaultValue={profile.username}
              onChange={onChange}
            />
            <ErrorMessage>{formErrors.Username}</ErrorMessage>
          </FormGroup>
          <FormGroup className="form-group">
            <label htmlFor="description">Description</label>
            <DescriptionTextArea
              type="text"
              placeholder={profile.description}
              id="description"
              defaultValue={profile.description}
              onChange={onChange}
            />
            <ErrorMessage>{formErrors.Description}</ErrorMessage>
          </FormGroup>
          <FormGroup className="form-group">
            <label htmlFor="oldPassword">Old Password</label>
            <FormInput
              type="text"
              placeholder="*******"
              id="oldPassword"
              defaultValue={profile.oldPassword}
              onChange={onChange}
            />
            <ErrorMessage>{formErrors.OldPassword}</ErrorMessage>
          </FormGroup>
          <FormGroup className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <FormInput
              type="text"
              placeholder="*******"
              id="newPassword"
              defaultValue={profile.newPassword}
              onChange={onChange}
            />
            <ErrorMessage>{formErrors.NewPassword}</ErrorMessage>
          </FormGroup>
          <RadioGroup
            name="race"
            onChange={onRadioChange}
            value={profile.profileImage}
          >
            <Radio value="Terran-img.png" />
            Terran
            <Radio value="Protoss-img.png" />
            Protoss
            <Radio value="Zerg-img.png" />
            Zerg
          </RadioGroup>
          <ErrorMessage>{formErrors.ProfileImage}</ErrorMessage>
        </form>
        <SuccessMessage>{successMessage}</SuccessMessage>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <SubmitBtn onClick={onSubmit}>Update profile</SubmitBtn>
        <NavLink to={"/user/" + profileId}>
          <SubmitBtn>View Profile</SubmitBtn>
        </NavLink>

        <SubmitBtn onClick={onBuildButtonClick}>New Build Order</SubmitBtn>
      </ProfileSection>
    </Page>
  );
};

export default Profile;
