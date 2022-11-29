import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import ItemCard from "../components/ItemCard";
import Dialog from "@mui/material/Dialog";
import { DialogTitle } from "@mui/material";
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
});

const Title = styled("div")({
  fontFamily: "Kaushan Script, cursive",
  color: "#76BCFF",
  fontSize: "52px",
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

const items = [
  {
    title: "Dog Bed",
    category: "Housing",
    description: "Comfortable bed for medium sized dogs. Barely used.",
    sellerEmail: "jason.nguyen@gmail.com",
    price: 25,
  },
  {
    title: "Dog Treats",
    category: "Food",
    description: "2lb bag of vegan dog treats.",
    sellerEmail: "brian.nguyen@gmail.com",
    price: 10,
  },
  {
    title: "Bird Cage Mirror",
    category: "Toys",
    description: "10 inch double sided mirror for large cages.",
    sellerEmail: "dimitar.janevski@gmail.com",
    price: 50,
  },
];

const Marketplace = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState(1);
  const [newCategory, setNewCategory] = useState("");

  const handleSubmit = () => {
    const data = {
      title: newTitle,
      description: newDescription,
      price: newPrice,
      category: newCategory,
    };
    console.log(data);
    setNewTitle("");
    setNewDescription("");
    setNewPrice(1);
    setNewCategory("");
    setOpenDialog(false);
  };

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
    <div>
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
    </div>
  );
};

export default Marketplace;
