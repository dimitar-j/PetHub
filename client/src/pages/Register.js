import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Axios from "axios";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const Wrapper = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

const FormContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "40%",
  justifyContent: "space-around",
  paddingTop: "20px",
  paddingBottom: "50px",
});

const SubmitButton = styled(Button)({
  color: "#FFFFFF",
});

const Title = styled("div")({
  fontFamily: "Kaushan Script, cursive",
  color: "#76BCFF",
  fontSize: "48px",
});

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [pfLink, setPfLink] = useState("");
  const [isServiceProvider, setIsServiceProvider] = useState(false);
  const [location, setLocation] = useState("");

  const validForm = () => {
    return (
      email !== "" &&
      password != "" &&
      firstName != "" &&
      lastName != "" &&
      address != "" &&
      birthday != "" &&
      pfLink != "" &&
      (isServiceProvider ? location !== "" : true)
    );
  };

  const handleSubmit = () => {
    const data = {
      username: email,
      password: password,
      fname: firstName,
      lname: lastName,
      address: address,
      birthday: birthday,
      profile_photo: pfLink,
      location,
      isServiceProvider,
    };
    console.log(data);
    Axios.post("http://localhost:3001/create-user", data).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <NavBar></NavBar>
      <Wrapper>
        <FormContainer>
          <Title>Create Account</Title>
          <TextField
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            id="Email"
            label="Email"
            variant="outlined"
          />
          <TextField
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            id="Password"
            label="Password"
            variant="outlined"
          />
          <TextField
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            id="First Name"
            label="First Name"
            variant="outlined"
          />
          <TextField
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            id="Last Name"
            label="Last Name"
            variant="outlined"
          />
          <TextField
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            id="Address"
            label="Address"
            variant="outlined"
          />
          <TextField
            type="date"
            value={birthday}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => setBirthday(event.target.value)}
            id="Birthday"
            label="Birthday"
            variant="outlined"
          />
          <TextField
            value={pfLink}
            onChange={(event) => setPfLink(event.target.value)}
            id="Profile Photo Link"
            label="Profile Photo Link"
            variant="outlined"
          />
          <FormControlLabel
            control={
              <Checkbox
                value={isServiceProvider}
                onChange={(event) => setIsServiceProvider(event.target.checked)}
              />
            }
            labelPlacement="start"
            label="Service Provider"
          />
          {isServiceProvider && (
            <TextField
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              id="Location"
              label="Location"
              variant="outlined"
            />
          )}
          <SubmitButton
            variant="contained"
            disabled={!validForm()}
            onClick={handleSubmit}
          >
            CREATE ACCOUNT
          </SubmitButton>
        </FormContainer>
      </Wrapper>
    </>
  );
};

export default Register;
