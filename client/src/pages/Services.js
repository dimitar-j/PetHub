import React from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import CasualServiceCard from "../components/CasualServiceCard";
import VetCard from "../components/VetCard";
import AnimalCard from "../components/AnimalCard";
import { useUserAuth } from "../context/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";

const Wrapper = styled("div")({
  width: "100ww",
  display: "flex",
  flexDirection: "column",
  paddingLeft: "20%",
  paddingRight: "20%",
});

const Header = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingTop: "40px",
  paddingBottom: "20px",
});

const Title = styled("div")({
  fontFamily: "Kaushan Script, cursive",
  color: "#76BCFF",
  fontSize: "52px",
  fontWeight: "800",
});

const Table = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  paddingTop: "40px",
  flexDirection: "column",
  gap: "25px",
  paddingBottom: "40px",
});

const SubTitle = styled("div")({
  fontFamily: "Montserrat, sans-serif",
  color: "#0F1020",
  fontWeight: "400",
  fontSize: "32px",
});

const Services = () => {
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);
  const [vets, setVets] = useState([]);
  const [casualServices, setCasualServices] = useState([]);

  const getCasualServices = () => {
    axios.get("http://localhost:3001/get-casualservices").then((response) => {
      console.log(response.data);
    });
  };

  const getVets = () => {
    axios.get("http://localhost:3001/get-vets").then((response) => {
      console.log(response.data);
    });
  };

  const getAnimals = () => {
    axios.get("http://localhost:3001/get-animals").then((response) => {
      console.log(response.data);
    });
  };

  useEffect(() => {
    getCasualServices();
    getVets();
    getAnimals();
  }, [])

  return (
    <>
      <NavBar></NavBar>
      <Wrapper>
        <Header>
          <Title>Services</Title>
          {user.isServiceProvider && (
            <Button
              variant="contained"
              color="primary"
              sx={{ color: "#ffffff" }}
              onClick={() => {
                navigate("/myservices");
              }}
            >
              My Services
            </Button>
          )}
        </Header>
        <SubTitle>Casual Services</SubTitle>
        <Table>
          {casualServices.map((cs, index) => (
            <CasualServiceCard key={index} content={cs}></CasualServiceCard>
          ))}
        </Table>
        <SubTitle>Vets</SubTitle>
        <Table>
          {vets.map((vet, index) => (
            <VetCard key={index} content={vet}></VetCard>
          ))}
        </Table>
        <SubTitle>Animals</SubTitle>
        <Table>
          {animals.map((animal, index) => (
            <AnimalCard key={index} content={animal}></AnimalCard>
          ))}
        </Table>
      </Wrapper>
    </>
  );
};

export default Services;
