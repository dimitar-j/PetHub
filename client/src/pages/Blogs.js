import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import BlogCard from "../components/BlogCard";
import Dialog from "@mui/material/Dialog";
import { DialogTitle } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
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

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newPhoto, setNewPhoto] = useState("");

  const handleSubmit = () => {
    const data = {
      title: newTitle,
      content: newContent,
      photo: newPhoto,
    };
    axios
      .post("http://localhost:3001/create-blog", {
        data,
      })
      .then((response) => {
        getBlogs();
        setNewTitle("");
        setNewContent("");
        setNewPhoto("");
        setOpenDialog(false);
      });
  };

  const getBlogs = () => {
    axios.get("http://localhost:3001/get-blogs").then((response) => {
      console.log(response.data);
      setBlogs(response.data);
    });
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const handleChange = (event) => {
    if (event.target.id === "title") {
      setNewTitle(event.target.value);
    }
    if (event.target.id === "content") {
      setNewContent(event.target.value);
    }
    if (event.target.id === "photo") {
      setNewPhoto(event.target.value);
    }
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
        <DialogTitle>Post New Blog</DialogTitle>
        <Form>
          <TextField
            required
            id="title"
            label="Title"
            value={newTitle}
            onChange={handleChange}
          />
          <TextField
            required
            id="content"
            label="Content"
            multiline
            value={newContent}
            onChange={handleChange}
          />
          <TextField
            required
            id="photo"
            label="Photo URL"
            value={newPhoto}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ color: "#ffffff" }}
            onClick={handleSubmit}
            disabled={
              newTitle.trim() === "" ||
              newContent.trim() === "" ||
              newPhoto.trim() === ""
            }
          >
            Post Blog
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
          <Title>Blogs</Title>
          <Button
            variant="contained"
            color="primary"
            sx={{ color: "#ffffff" }}
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            Post Blog
          </Button>
        </Header>
        <Table>
          {blogs.slice(0).reverse().map((blog) => (
            <BlogCard content={blog}></BlogCard>
          ))}
        </Table>
      </Wrapper>
      {renderDialog()}
    </div>
  );
};

export default Blogs;
