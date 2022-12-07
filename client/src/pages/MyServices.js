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
import axios from "axios";
import { useUserAuth } from "../context/UserContext";
import { useEffect } from "react";

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

const MyServices = () => {
  const isServiceProvider = true;
  const navigate = useNavigate();
  const { user } = useUserAuth();
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

  const [myCasualServices, setMyCasualServices] = useState([]);
  const [myVets, setMyVets] = useState([]);
  const [myAnimals, setMyAnimals] = useState([]);

  const getMyCasualServices = (user_id) => {
    axios.get("http://localhost:3001/get-mycasualservices", {
      params: {
        user_id: user_id
      }
    }).then((response) => {
      console.log(response);
    })
  };

  const getMyVets = (user_id) => {
    axios.get("http://localhost:3001/get-myvets", {
      params: {
        user_id: user_id
      }
    }).then((response) => {
      console.log(response);
    })
  };

  const getMyAnimals = (user_id) => {
    axios.get("http://localhost:3001/get-myanimals", {
      params: {
        user_id: user_id
      }
    }).then((response) => {
      console.log(response);
    })
  };

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
        user_id: user.user_id,
        title: newTitle,
        description: newDescription,
        providerEmail: user.username,
        providerName: user.fname + " " + user.lname,
        location: user.location,
        price: newPrice,
      };
      axios.post("http://localhost:3001/create-casualservice", data).then((response) => {
        console.log(response.data);
      });
    } else if (addingService === "Veterinary") {
      const data = {
        user_id: user.user_id,
        title: newTitle,
        location: user.location,
        certLink: newCertLink,
        certExpDate: newVetExpDate,
        issuer: newIssuer,
      };
      axios.post("http://localhost:3001/create-vet", data).then((response) => {
        console.log(response.data);
      });
    } else if (addingService === "Animal") {
      const data = {
        user_id: user.user_id,
        title: newTitle,
        description: newDescription,
        providerEmail: user.username,
        breed: newBreed,
        providerName: user.fname + " " + user.lname,
        location: newLocation,
        price: newPrice,
        image: newPhoto,
      };
      axios.post("http://localhost:3001/create-animal", data).then((response) => {
        console.log(response.data);
      });
      console.log(data);
    }
  };

  useEffect(() => {
    getMyCasualServices(user.user_id);
    getMyVets(user.user_id);
    getMyAnimals(user.user_id);
  }, [user]);

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

  useEffect(() => {
    getMyCasualServices(user.user_id);
    getMyVets(user.user_id);
    getMyAnimals(user.user_id);
  }, [user]);

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
          {myCasualServices.map((cs) => (
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
          {myVets.map((vet) => (
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
          {myAnimals.map((animal) => (
            <AnimalCard content={animal}></AnimalCard>
          ))}
        </Table>
      </Wrapper>
      {renderDialog()}
    </>
  );
};

export default MyServices;
