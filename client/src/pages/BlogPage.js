import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CommentCard from "../components/CommentCard";
import axios from "axios";
import { useUserAuth } from "../context/UserContext";
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
  width: "450px",
});

const Body = styled("div")({
  fontFamily: "Montserrat, sans-serif",
  color: "#0F1020",
  fontWeight: "100",
  fontSize: "18px",
});

const BlogPage = () => {
  const location = useLocation();

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const { user } = useUserAuth();

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = () => {
    const data = {
      blog_id: location.state.blog_id,
      user_id: user.user_id,
      content: newComment,
      fname: user.fname,
      lname: user.lname,
    };
    axios
      .post("http://localhost:3001/create-comment", {
        data,
      })
      .then((response) => {
        setNewComment("");
        getComments(location.state.blog_id);
      });
  };

  const getComments = (blog_id) => {
    axios
      .get("http://localhost:3001/get-comments", {
        params: {
          blog_id: blog_id,
        },
      })
      .then((response) => {
        console.log(response);
        setComments(response.data);
      });
  };

  useEffect(() => {
    getComments(location.state.blog_id);
  }, [location.state.blog_id]);

  console.log(location.state);
  return (
    <div>
      <NavBar></NavBar>
      <Wrapper>
        <Title>{location.state.title}</Title>
        <Image src={location.state.photo}></Image>
        <Body>{location.state.content}</Body>
        <Subtitle>Comments</Subtitle>
        <TextField
          label="Add Comment"
          multiline
          rows={2}
          variant="standard"
          value={newComment}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          sx={{
            color: "#FFFFFF",
          }}
          disabled={newComment.trim() === ""}
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
