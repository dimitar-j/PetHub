import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import ItemCard from "../components/ItemCard";
import Dialog from "@mui/material/Dialog";
import { DialogTitle, getListItemSecondaryActionClassesUtilityClass } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useUserAuth } from "../context/UserContext";

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
});

const Form = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "0 20px 20px 20px",
});

const Marketplace = () => {
  const [items, setItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState(1);
  const [newCategory, setNewCategory] = useState("");
  const { user } = useUserAuth();

  const handleSubmit = () => {
    const data = {
      title: newTitle,
      category: newCategory,
      description: newDescription,
      sellerEmail: user.username,
      price: newPrice,
    };
    console.log(data);
    axios.post("http://localhost:3001/create-item", {
      data
    }).then((response) => {
      getItems();
      setNewTitle("");
      setNewDescription("");
      setNewPrice(1);
      setNewCategory("");
      setOpenDialog(false);
    });
  };

  const getItems = () => {
    axios.get("http://localhost:3001/get-items").then((response) => {
      setItems(response.data);
    });
  };

  useEffect(() => {
    getItems();
  }, []);

  const renderDialog = () => {
    return (
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        fullWidth
        maxWidth={"md"}
      >
        <DialogTitle>Post New Item</DialogTitle>
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
            label="Category"
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ color: "#ffffff" }}
            onClick={handleSubmit}
            disabled={
              newTitle.trim() == "" ||
              newDescription.trim() == "" ||
              newCategory.trim() == "" ||
              newPrice < 1
            }
          >
            Post Item
          </Button>
        </Form>
      </Dialog>
    );
  };

  return (
    <>
      <NavBar></NavBar>
      <Wrapper>
        <Header>
          <Title>Marketplace</Title>
          <Button
            variant="contained"
            color="primary"
            sx={{ color: "#ffffff" }}
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            Post Item
          </Button>
        </Header>
        <Table>
          {items.map((item) => (
            <ItemCard content={item}></ItemCard>
          ))}
        </Table>
      </Wrapper>
      {renderDialog()}
    </>
  );
};

export default Marketplace;
