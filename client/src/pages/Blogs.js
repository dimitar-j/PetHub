import React, { useState } from "react";
import NavBar from '../components/NavBar'
import { Link, useNavigate } from "react-router-dom";
import { styled } from '@mui/system';
import Button from "@mui/material/Button";
import BlogCard from '../components/BlogCard';
import Dialog from '@mui/material/Dialog';
import { DialogTitle } from "@mui/material";
import TextField from '@mui/material/TextField';

const Wrapper = styled('div')({
    width:"100ww",
    display:"flex",
    flexDirection:"column",
    paddingLeft:"20%",
    paddingRight:"20%",
    position:"relative"
})

const Header = styled('div')({
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",
    paddingTop:"40px"
})

const Title = styled('div')({
    fontFamily: "Kaushan Script, cursive",
    color:"#76BCFF",
    fontSize:"52px"
  })

const Table = styled('div')({
    display:"flex",
    alignItems:"center",
    justifyContent:"space-around",
    paddingTop:"40px",
    flexDirection:"column",
    gap:"25px"
})

const Form = styled('div')({
    display:"flex",
    flexDirection:"column",
    gap:"20px",
    padding:"0 20px 20px 20px"
})

const blogs = [
    {
        "name": "How to Train Your Dog to Sit"
    },
    {
        "name": "Picking the Right Food for Your Puppy"
    },
    {
        "name": "How Often Should You Wash Your Dog"
    },
]

const Blogs = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [newPhoto, setNewPhoto] = useState("");

    const handleSubmit = () => {
        const data = {
            "title": newTitle,
            "content": newContent,
            "photo": newPhoto
        }
        console.log(data);
        setNewTitle("");
        setNewContent("");
        setNewPhoto("");
        setOpenDialog(false);
    }

    const handleChange = (event) => {
        if (event.target.id == "title"){
            setNewTitle(event.target.value);
        }
        if (event.target.id == "content"){
            setNewContent(event.target.value);
        }
        if (event.target.id == "photo"){
            setNewPhoto(event.target.value);
        }
    }

    const renderDialog = () => {
        return(
            <Dialog 
                open={openDialog}
                onClose={()=>{setOpenDialog(false)}}
                fullWidth
                maxWidth={"md"}
            >
                <DialogTitle>
                    Post New Blog
                </DialogTitle>
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
                    <Button variant="contained" color="primary" sx={{color:"#ffffff"}} onClick={handleSubmit}>Post Blog</Button>
                </Form>
            </Dialog>
        )
    }
    return (
        <div>
            <NavBar></NavBar>
            <Wrapper>
                <Header>
                    <Title>
                        Blogs
                    </Title>
                    <Button variant="contained" color="primary" sx={{color:"#ffffff"}} onClick={()=>{setOpenDialog(true)}}>Post Blog</Button>
                </Header>
                <Table>
                    {blogs.map((blog) => 
                        <BlogCard content={blog}></BlogCard>
                    )}
                </Table>
            </Wrapper>
            {renderDialog()}
        </div>
    )
}

export default Blogs
