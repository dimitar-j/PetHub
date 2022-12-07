import React, { useState } from "react";
import { styled } from "@mui/system";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

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

const ItemCard = (props) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = () => {
    setOpenDialog(true);
  };

  const renderDialog = () => {
    return (
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
      </Dialog>
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
