import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import Logo from "../assets/logo.png"

const Container = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "space-around",
  paddingTop: "20px",
  backgroundColor:"#F0F8FF",
  position: "absolute",
  paddingBottom:"20px"
});

const NavButton = styled(Button)({
  color: "#0F1020",
  backgroundColor: "#F0F8FF",
  transition: "0.25s",
  "&:hover": {
    backgroundColor: "#F0F8FF",
    textDecoration: "underline",
    transform: "scale(1.025)",
  },
});

const TextContainer = styled('div')({
    display:"flex",
    gap:"20px"
})

const Icon = styled('img')({
    "&:hover": {
        cursor:"pointer"
      },
})

const NavBar = (props) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(true);
  if (loggedIn) {
    return (
      <Container>
        <Icon src={Logo} width="50px" onClick={() => navigate("/")}></Icon>
        <TextContainer>
            <NavButton variant="text" onClick={() => navigate("/services")}>
            Services
            </NavButton>
            <NavButton variant="text" onClick={() => navigate("/blogs")}>
            Blogs
            </NavButton>
            <NavButton variant="text" onClick={() => navigate("/marketplace")}>
            Marketplace
            </NavButton>
        </TextContainer>
      </Container>
    );
  } else {
    return (
      <Container>
          <Icon src={Logo} width="50px" onClick={() => navigate("/")}></Icon>
          <TextContainer>
                <NavButton variant="text" onClick={() => navigate("/register")}>
                Create Account
                </NavButton>
                <NavButton variant="text" onClick={() => navigate("/login")}>
                Log In
                </NavButton>
          </TextContainer>
      </Container>
    );
  }
};
export default NavBar;
