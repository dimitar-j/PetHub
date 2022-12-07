import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { styled } from "@mui/system";
import Logo from "../assets/logo.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useUserAuth } from "../context/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  height: "80vh",
  alignItems: "center",
});

const FormContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "25px",
  alignItems: "center",
});

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const data = {
      email,
      password,
    };
    login(data);
  };

  useEffect(() => {
    if (user){
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <NavBar></NavBar>
      <Wrapper>
        <FormContainer>
          <img src={Logo} width="40%"></img>
          <TextField
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            id="Email"
            label="Email"
            variant="outlined"
            fullWidth
          />
          <TextField
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            id="Password"
            label="Password"
            variant="outlined"
            fullWidth
          />
          <Button
            variant="contained"
            disabled={email === "" || password === ""}
            onClick={handleSubmit}
            sx={{ color: "white" }}
            fullWidth
          >
            LOG IN
          </Button>
        </FormContainer>
      </Wrapper>
    </>
  );
};

export default LogIn;
