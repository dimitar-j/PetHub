import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import ItemCard from "../components/ItemCard";
import Dialog from "@mui/material/Dialog";
import { DialogTitle } from "@mui/material";
import TextField from "@mui/material/TextField";
import CasualServiceCard from "../components/CasualServiceCard";
import VetCard from "../components/VetCard";
import AnimalCard from "../components/AnimalCard";

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

const casualServices = [
  {
    title: "Dog Walking",
    description: "I will walk your dog around forest lawn for 1 hour a week",
    providerEmail: "jason.nguyen@gmail.com",
    providerName: "Jason Nguyen",
    location: "NE Calgary",
    price: 25,
    rating: 4.7,
    reviews: [
      {
        review: "soooo gooooooood",
        author: "John Doe",
      },
      {
        review: "he stole my dog",
        author: "John Doe",
      },
    ],
  },
  {
    title: "Cat Walking",
    description: "I will walk your cat around forest lawn for 1 hour a week",
    providerEmail: "jason.nguyen@gmail.com",
    providerName: "Jason Nguyen",
    location: "NE Calgary",
    price: 35,
    rating: 4.7,
    reviews: [
      {
        review: "soooo gooooooood",
        author: "John Doe",
      },
      {
        review: "he stole my cat",
        author: "John Doe",
      },
    ],
  },
];

const vets = [
  {
    title: "Bridlewood Veterinary",
    location: "Bridlewood",
    rating: 3.7,
    reviews: [
      {
        review: "Friendly staff",
        author: "Fiachna Asher",
      },
    ],
  },
];

const animals = [
  {
    title: "Golden Retriever Puppy",
    description: "Potty trained Golden Retriever 4 months old puppy.",
    providerEmail: "brian.nguyen@gmail.com",
    providerName: "Brian Nguyen",
    location: "Chestermere",
    breed: "Golden Retriever",
    price: 1000,
    rating: "-",
    image:
      "https://images.squarespace-cdn.com/content/v1/54e7a1a6e4b08db9da801ded/4f509146-8d70-4f84-9e52-197df4279616/82.jpg",
    reviews: [],
  },
  {
    title: "Shi Tzu",
    description: "4 yeard old Shi Tzu looking for a new family",
    providerEmail: "dimitar.janevski@gmail.com",
    breed: "Shi Tzu",
    providerName: "Dimitar Janevski",
    location: "Somerset",
    price: 750,
    rating: "-",
    image: "https://cdn.britannica.com/05/234205-050-F8D2E018/Shih-tzu-dog.jpg",
    reviews: [],
  },
];

const Services = () => {
  return (
    <>
      <NavBar></NavBar>
      <Wrapper>
        <Header>
          <Title>Services</Title>
        </Header>
        <SubTitle>Casual Services</SubTitle>
        <Table>
          {casualServices.map((cs) => (
            <CasualServiceCard content={cs}></CasualServiceCard>
          ))}
        </Table>
        <SubTitle>Vets</SubTitle>
        <Table>
          {vets.map((vet) => (
            <VetCard content={vet}></VetCard>
          ))}
        </Table>
        <SubTitle>Animals</SubTitle>
        <Table>
          {animals.map((animal) => (
            <AnimalCard content={animal}></AnimalCard>
          ))}
        </Table>
      </Wrapper>
    </>
  );
};

export default Services;
