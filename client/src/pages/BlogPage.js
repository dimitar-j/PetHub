import React from 'react'
import NavBar from '../components/NavBar';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/system";

const Wrapper = styled('div')({
    width:"100ww",
    display:"flex",
    flexDirection:"column",
    paddingLeft:"20%",
    paddingRight:"20%",
    marginTop:"20px",
    marginBottom:"50px",
    gap:"30px"
})

const Title = styled('div')({
    fontFamily: "Kaushan Script, cursive",
    color:"#76BCFF",
    fontSize:"52px"
  })

const Image = styled('img')({
    borderRadius:"18px"
})

const Body = styled('div')({
    fontFamily: "Montserrat, sans-serif",
    color:"#0F1020",
    fontWeight:"100",
    fontSize:"18px"
})

const BlogPage = () => {
    const location = useLocation();
    console.log(location.state);
    return (
        <div>
            <NavBar></NavBar>
            <Wrapper>
                <Title>{location.state.name}</Title>
                <Image src={location.state.photo}></Image>
                <Body>{location.state.content}</Body>
            </Wrapper>
        </div>
    )
}

export default BlogPage
