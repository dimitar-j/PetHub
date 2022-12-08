import React, { useState } from "react";
import { styled } from "@mui/system";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useUserAuth } from "../context/UserContext";
import Button from "@mui/material/Button";
import axios from "axios";
import TextField from "@mui/material/TextField";


const Container = styled("div")({
  boxShadow:
    "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;",
  width: "100%",
  height: "125px",
  boxSizing: "border-box",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  padding: "25px",
  alignItems: "flex-start",
  justifyContent: "center",
  gap: "5px",
  transition: "0.1s",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.01)",
  },
});

const Title = styled("div")({
  fontFamily: "Montserrat, sans-serif",
  color: "#0F1020",
  fontWeight: "400",
  fontSize: "24px",
});

const Body = styled("div")({
  fontFamily: "Montserrat, sans-serif",
  color: "#0F1020",
  fontWeight: "400",
  fontSize: "18px",
});

const Subtitle = styled("div")({
  fontFamily: "Montserrat, sans-serif",
  color: "rgba(0,0,0,0.5)",
  fontWeight: "300",
  fontSize: "16px",
});

const CategoryText = styled("div")({
  fontFamily: "Montserrat, sans-serif",
  color: "black",
  fontWeight: "100",
  fontSize: "16px",
  fontStyle: "italic",
});

const SubContainer = styled("div")({
  display: "flex",
  gap: "15px",
});

const Content = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: "0 25px 50px 25px",
  gap: "20px",
});

const Form = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "0 20px 20px 20px",
});

const ItemCard = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditingDialog, setEditingDialog] = useState(false);
  const [newTitle, setNewTitle] = useState(props.content["title"]);
  const [newDescription, setNewDescription] = useState(props.content['description']);
  const [newPrice, setNewPrice] = useState(props.content['price']);
  const [newCategory, setNewCategory] = useState(props.content['category']);
  const { user } = useUserAuth();

  const handleClick = () => {
    setOpenDialog(true);
  };

  const deleteItem = () => {
    console.log(props.content["id"])
    axios.post("http://localhost:3001/delete-item", {
      item_id: props.content["id"],
    }).then((response) => {
      console.log(response);
    });
  };

  const updateMode = () => {
    setEditingDialog(true);
    setOpenDialog(false);
  }

  const handleEditBlog = () => {
    const data = {
      title: newTitle,
      category: newCategory,
      description: newDescription,
      sellerEmail: user.username,
      user_id: user.user_id,
      price: newPrice,
    };

    console.log(data);
  };

  const renderDialog = () => {
    return (
      <>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          <Title>{props.content["title"]}</Title>
        </DialogTitle>
        <Content>
          <Body>${props.content["price"]}</Body>
          <Body>
            <a href={`mailto: ${props.content["sellerEmail"]}`}>
              {props.content["sellerEmail"]}
            </a>
          </Body>
          <Body>{props.content["description"]}</Body>
        </Content>
        {parseInt(props.content["user_id"]) === user.user_id && (
          <Button
          variant="contained"
          color="primary"
          sx={{ color: "#ffffff" }}
          onClick={deleteItem}
          >
          Delete Item
        </Button>
        )} 
        <br/>
        {parseInt(props.content["user_id"]) === user.user_id && (
          <Button
          variant="contained"
          color="primary"
          sx={{ color: "#ffffff" }}
          onClick={updateMode}
          >
          Update Item
        </Button>
        )} 
      </Dialog>
      <Dialog open={openEditingDialog} onClose={() => setEditingDialog(false)}>
        <DialogTitle>
          <Title>Editing</Title>
        </DialogTitle>
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
              onClick={handleEditBlog}
              disabled={
                newTitle.trim() === "" ||
                newDescription.trim() === "" ||
                newCategory.trim() === "" ||
                newPrice < 1
              }
            >
              Post Item
            </Button>
          </Form>
      </Dialog>
      </>
    );
  };

  return (
    <>
      <Container onClick={handleClick}>
        <Title>{props.content["title"]}</Title>
        <SubContainer>
          <Subtitle>${props.content["price"].toFixed(2)}</Subtitle>
          <CategoryText>{props.content["category"]}</CategoryText>
        </SubContainer>
      </Container>
      {renderDialog()}
    </>
  );
};

export default ItemCard;
