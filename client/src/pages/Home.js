import React from "react";
import { styled } from "@mui/system";
import NavBar from "../components/NavBar.js";
import Logo from "../assets/logo.png";

const Page = styled("div")({
  width: "100vw",
  height: "100vh",
  backgroundColor: "#F0F8FF",
});

const Container = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  gap: "50px",
  position: "relative",
  top: "25%",
});

const TextContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const Title = styled("div")({
  fontFamily: "Kaushan Script, cursive",
  color: "#76BCFF",
  fontSize: "92px",
  fontWeight: "800",
});

const SubTitle = styled("div")({
  fontFamily: "Montserrat, sans-serif",
  color: "#0F1020",
  fontWeight: "300",
  fontSize: "24px",
});

const Home = () => {
  return (
    <Page>
      <NavBar></NavBar>
      <Container>
        <img src={Logo} width="300px" height="300px" alt="logo"></img>
        <TextContainer>
          <Title>PetHub</Title>
          <SubTitle>One stop shop for your pet</SubTitle>
        </TextContainer>
      </Container>
    </Page>
  );
};
export default Home;
