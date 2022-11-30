import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CommentCard from "../components/CommentCard";
const Wrapper = styled("div")({
  width: "100ww",
  display: "flex",
  flexDirection: "column",
  paddingLeft: "20%",
  paddingRight: "20%",
  marginTop: "20px",
  marginBottom: "50px",
  gap: "30px",
});

const Title = styled("div")({
  fontFamily: "Kaushan Script, cursive",
  color: "#76BCFF",
  fontSize: "52px",
  fontWeight: "800",
});

const Subtitle = styled("div")({
  fontFamily: "Montserrat, sans-serif",
  color: "#0F1020",
  fontSize: "32px",
});

const Image = styled("img")({
  borderRadius: "18px",
});

const Body = styled("div")({
  fontFamily: "Montserrat, sans-serif",
  color: "#0F1020",
  fontWeight: "100",
  fontSize: "18px",
});

const comments = [
  {
    author: "Dimitar Janevski",
    content: "Nice Post",
  },
  {
    author: "Brian Nguyen",
    content: "Very Useful",
  },
];

const BlogPage = () => {
  const location = useLocation();

  const [comment, setComment] = useState("");

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    console.log(comment);
    setComment("");
  };

  console.log(location.state);
  return (
    <div>
      <NavBar></NavBar>
      <Wrapper>
        <Title>{location.state.name}</Title>
        <Image src={location.state.photo}></Image>
        <Body>{location.state.content}</Body>
        <Subtitle>Comments</Subtitle>
        <TextField
          label="Add Comment"
          multiline
          rows={2}
          variant="standard"
          value={comment}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          sx={{
            color: "#FFFFFF",
          }}
          disabled={comment.trim() == ""}
          onClick={handleSubmit}
        >
          Post
        </Button>
        {comments.map((comment) => (
          <CommentCard content={comment}></CommentCard>
        ))}
      </Wrapper>
    </div>
  );
};

export default BlogPage;
