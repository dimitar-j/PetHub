import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import CasualServiceCard from "../components/CasualServiceCard";
import VetCard from "../components/VetCard";
import AnimalCard from "../components/AnimalCard";
import { DialogTitle, Dialog } from "@mui/material";
import TextField from "@mui/material/TextField";

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

const Form = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "0 20px 20px 20px",
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

const MyServices = () => {
  const isServiceProvider = true;
  const navigate = useNavigate();
  const [addingService, setAddingService] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState(1);
  const [newDescription, setNewDescription] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newBreed, setNewBreed] = useState("");
  const [newPhoto, setNewPhoto] = useState("");
  const [newCertLink, setNewCertLink] = useState("");
  const [newVetExpDate, setNewVetExpDate] = useState("");
  const [newIssuer, setNewIssuer] = useState("");

  const handleDialogOpen = (service) => {
    setOpenDialog(true);
    setAddingService(service);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewTitle("");
    setNewPrice("");
    setNewDescription("");
    setNewLocation("");
    setNewBreed("");
    setNewPhoto("");
    setNewCertLink("");
    setNewVetExpDate("");
    setNewIssuer("");
  };

  const handleSubmit = () => {
    if (addingService === "Casual Service") {
      const data = {
        title: newTitle,
        description: newDescription,
        price: newPrice,
      };
      console.log(data);
    } else if (addingService === "Veterinary") {
      const data = {
        name: newTitle,
        certLink: newCertLink,
        certExpDate: newVetExpDate,
        issuer: newIssuer,
      };
      console.log(data);
    } else if (addingService === "Animal") {
      const data = {
        title: newTitle,
        description: newDescription,
        price: newPrice,
        locaiton: newLocation,
        breed: newBreed,
        photoURL: newPhoto,
      };
      console.log(data);
    }
  };

  const renderDialog = () => {
    if (addingService === "Casual Service") {
      return (
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Add New {addingService}</DialogTitle>
          <Form>
            <TextField
              label="Title"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
            />
            <TextField
              label="Description"
              multiline
              value={newDescription}
              onChange={(event) => setNewDescription(event.target.value)}
            />
            <TextField
              type="number"
              label="Price"
              value={newPrice}
              onChange={(event) => setNewPrice(event.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ color: "#ffffff" }}
              onClick={handleSubmit}
              disabled={
                newTitle.trim() == "" ||
                newDescription.trim() == "" ||
                newPrice < 1
              }
            >
              Post Casual Service
            </Button>
          </Form>
        </Dialog>
      );
    }
    if (addingService === "Veterinary") {
      return (
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Add New {addingService}</DialogTitle>
          <Form>
            <TextField
              label="Name"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
            />
            <TextField
              label="Certification Link"
              value={newCertLink}
              onChange={(event) => setNewCertLink(event.target.value)}
            />
            <TextField
              label="Expiration Date"
              type="date"
              value={newVetExpDate}
              onChange={(event) => setNewVetExpDate(event.target.value)}
            />
            <TextField
              label="Issued By"
              value={newIssuer}
              onChange={(event) => setNewIssuer(event.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ color: "#ffffff" }}
              onClick={handleSubmit}
              disabled={
                newTitle.trim() == "" ||
                newCertLink.trim() == "" ||
                newIssuer.trim() == "" ||
                !newVetExpDate.trim()
              }
            >
              Post Veterinary
            </Button>
          </Form>
        </Dialog>
      );
    }
    if (addingService === "Animal") {
      return (
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Add New {addingService}</DialogTitle>
          <Form>
            <TextField
              label="Title"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
            />
            <TextField
              label="Description"
              multiline
              value={newDescription}
              onChange={(event) => setNewDescription(event.target.value)}
            />
            <TextField
              type="number"
              label="Price"
              value={newPrice}
              onChange={(event) => setNewPrice(event.target.value)}
            />
            <TextField
              label="Location"
              value={newLocation}
              onChange={(event) => setNewLocation(event.target.value)}
            />
            <TextField
              label="Breed"
              value={newBreed}
              onChange={(event) => setNewBreed(event.target.value)}
            />
            <TextField
              label="Photo URL"
              multiline
              value={newPhoto}
              onChange={(event) => setNewPhoto(event.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ color: "#ffffff" }}
              onClick={handleSubmit}
              disabled={
                newTitle.trim() == "" ||
                newDescription.trim() == "" ||
                newLocation.trim() === "" ||
                newBreed.trim() === "" ||
                newPhoto.trim() === "" ||
                newPrice < 1
              }
            >
              Post Animal
            </Button>
          </Form>
        </Dialog>
      );
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <Wrapper>
        <Header>
          <Title>My Services</Title>
        </Header>
        <Header>
          <SubTitle>Casual Services</SubTitle>
          <Button
            variant="contained"
            color="primary"
            sx={{ color: "#ffffff" }}
            onClick={() => {
              handleDialogOpen("Casual Service");
            }}
          >
            Add Casual Service
          </Button>
        </Header>
        <Table>
          {casualServices.map((cs) => (
            <CasualServiceCard content={cs}></CasualServiceCard>
          ))}
        </Table>
        <Header>
          <SubTitle>Vets</SubTitle>
          <Button
            variant="contained"
            color="primary"
            sx={{ color: "#ffffff" }}
            onClick={() => {
              handleDialogOpen("Veterinary");
            }}
          >
            Add Veterinary
          </Button>
        </Header>
        <Table>
          {vets.map((vet) => (
            <VetCard content={vet}></VetCard>
          ))}
        </Table>
        <Header>
          <SubTitle>Animals</SubTitle>
          <Button
            variant="contained"
            color="primary"
            sx={{ color: "#ffffff" }}
            onClick={() => {
              handleDialogOpen("Animal");
            }}
          >
            Add Animal
          </Button>
        </Header>
        <Table>
          {animals.map((animal) => (
            <AnimalCard content={animal}></AnimalCard>
          ))}
        </Table>
      </Wrapper>
      {renderDialog()}
    </>
  );
};

export default MyServices;
