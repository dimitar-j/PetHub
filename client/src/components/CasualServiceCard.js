import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import { useUserAuth } from "../context/UserContext";

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
  color: "#0F1020",
  fontWeight: "300",
  fontSize: "16px",
});

const Content = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: "0 25px 50px 25px",
  gap: "20px",
});

const CasualServiceCard = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [overallRating, setOverallRating] = useState(0);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(null);
  const { user } = useUserAuth();

  const renderReview = (review, index) => {
    return (
      <div key={index}>
        <Body>{review.content}</Body>
        <Subtitle style={{ fontSize: "14px", fontStyle: "italic" }}>
          {review.fname + " " + review.lname + " - " + review.rating + "/5"}
        </Subtitle>
      </div>
    );
  };

  const handleClick = () => {
    setOpenDialog(true);
  };

  const handleReviewSubmit = () => {
    const data = {
      service_uuid: props.content.casualservice_id,
      rating: rating,
      content: review,
      fname: user.fname,
      lname: user.lname
    };
    axios.post("http://localhost:3001/create-review", data).then((response) => {
      getReviews(props.content.casualservice_id);
    });
  };

  const getReviews = (uuid) => {
    axios.get("http://localhost:3001/get-reviews", {
      params: {
        service_uuid: uuid
      }
    }).then((response) => {
      setReviews(response.data);
      setOverallRating(response.data.reduce((accumulator, currReview) => accumulator + parseInt(currReview.rating), 0));
    })
  };

  useEffect(() => {
    getReviews(props.content.casualservice_id);
  }, [props.content.casualservice_id]);

  const renderDialog = () => {
    return (
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          <Title>{props.content["title"]}</Title>
        </DialogTitle>
        <Content>
          <Body>${props.content["price"]}</Body>
          <Body>Rating: {overallRating}/5</Body>
          <Body>Provided by: {props.content["providerName"]}</Body>
          <Body>
            <a href={`mailto: ${props.content["providerEmail"]}`}>
              {props.content["providerEmail"]}
            </a>
          </Body>
          <Body>{props.content["description"]}</Body>
          <Body sx={{ fontWeight: "600" }}>Reviews</Body>
          {!user.isServiceProvider && (
            <>
              <TextField
                label="Add Review"
                multiline
                rows={2}
                variant="standard"
                value={review}
                onChange={(event) => setReview(event.target.value)}
              />
              <Rating
                name="Rating"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
              <Button
                variant="contained"
                sx={{
                  color: "#FFFFFF",
                }}
                disabled={review.trim() === "" || rating === null}
                onClick={handleReviewSubmit}
              >
                Post
              </Button>
            </>
          )}
          {reviews.map((review, index) =>
            renderReview(review, index)
          )}
          {reviews.length === 0 && (
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
        <Subtitle>${parseInt(props.content["price"]).toFixed(2)}</Subtitle>
      </Container>
      {renderDialog()}
    </>
  );
};

export default CasualServiceCard;
