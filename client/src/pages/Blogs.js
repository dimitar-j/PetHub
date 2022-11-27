import React from 'react'
import NavBar from '../components/NavBar'
import { Link, useNavigate } from "react-router-dom";
import { styled } from '@mui/system';
import Button from "@mui/material/Button";
import BlogCard from '../components/BlogCard';

const Container = styled('div')({
    width:"100%",
})

const Header = styled('div')({
    display:"flex",
    alignItems:"center",
    justifyContent:"space-around",
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
    flexDirection:"column"
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
    return (
        <div>
            <NavBar></NavBar>
            <Container>
                <Header>
                    <Title>
                        Blogs
                    </Title>
                    <Button variant="contained" color="primary" sx={{color:"#ffffff"}}>Post Blog</Button>
                </Header>
                <Table>
                    {blogs.map((blog) => 
                        <BlogCard content={blog}></BlogCard>
                    )}
                </Table>
            </Container>
        </div>
    )
}

export default Blogs
