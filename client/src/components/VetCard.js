import React, { useState } from "react";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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

const Subtitle = styled("div")({
  fontFamily: "Montserrat, sans-serif",
  color: "#0F1020",
  fontWeight: "300",
  fontSize: "16px",
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

const Content = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: "0 25px 50px 25px",
  gap: "20px",
});

const VetCard = (props) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [review, setReivew] = useState("");

  const handleClick = () => {
    setOpenDialog(true);
  };

  const handleReviewsubmit = () => {
    console.log(review);
  };

  const renderReview = (review) => {
    return (
      <div>
        <Body>{review.review}</Body>
        <Subtitle style={{ fontSize: "14px", fontStyle: "italic" }}>
          {review.author}
        </Subtitle>
      </div>
    );
  };
  const renderDialog = () => {
    return (
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          <Title>{props.content["title"]}</Title>
        </DialogTitle>
        <Content>
          <Body>Rating: {props.content["rating"]}/5</Body>
          <Body>Location: {props.content["location"]}</Body>
          <Body sx={{ fontWeight: "600" }}>Reviews</Body>
          <TextField
            label="Add Review"
            multiline
            rows={2}
            variant="standard"
            value={review}
            onChange={(event) => setReivew(event.target.value)}
          />
          <Button
            variant="contained"
            sx={{
              color: "#FFFFFF",
            }}
            disabled={review.trim() == ""}
            onClick={handleReviewsubmit}
          >
            Post
          </Button>
          {props.content["reviews"].map((review) => renderReview(review))}
          {props.content["reviews"].length === 0 && (
            <Subtitle>No reviews yet</Subtitle>
          )}
        </Content>
      </Dialog>
    );
  };

  return (
    <>
      <Container onClick={handleClick}>
        <Title>{props.content["title"]}</Title>
      </Container>
      {renderDialog()}
    </>
  );
};

export default VetCard;
