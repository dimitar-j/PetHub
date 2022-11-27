import React, { useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Logo from '../assets/logo.png'
const Page = styled('div')({
  width:"100vw",
  height:"100vh",
  backgroundColor:"#F0F8FF"
})

const NavBar = styled('div')({
  display:"flex",
  width:"90%",
  justifyContent:"flex-end",
  gap: "50px",
  marginRight:"10px",
  paddingTop:"20px",
  position:"absolute",
});

const NavButton = styled(Button)({
  color: "#0F1020",
  backgroundColor:"#F0F8FF",
  transition:"0.25s",
  "&:hover": {
    backgroundColor:"#F0F8FF",
    textDecoration:"underline",
    transform:"scale(1.05)"
  }
})

const Container = styled('div')({
  display:"flex",
  width:"100%",
  height:"100%",
  justifyContent:"center",
  alignItems:"center",
  gap:"50px"
})

const TextContainer = styled('div')({
  display:"flex",
  flexDirection:"column",
  gap:"20px"
})

const Title = styled('div')({
  fontFamily: "Kaushan Script, cursive",
  color:"#76BCFF",
  fontSize:"72px"
})

const SubTitle = styled('div')({
  fontFamily: "Montserrat, sans-serif",
  color:"#0F1020",
  fontWeight:"100",
  fontSize:"24px"
})

const Home = () => {
  const navigate = useNavigate();

  return(
    <Page>
      <NavBar>
        <NavButton variant="text" onClick={() => navigate("/register")}>Create Account</NavButton>
        <NavButton variant="text">Log In</NavButton>
      </NavBar>
      <Container>
        <img src={Logo} width="300px" height="300px"></img>
        <TextContainer>
          <Title>
            PetHub
          </Title>
          <SubTitle>
            One stop shop for your pet
          </SubTitle>
        </TextContainer>
      </Container>
    </Page>
  );
}
export default Home;
