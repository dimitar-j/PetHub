import React from 'react'
import { styled } from '@mui/system';
import { Link, useNavigate } from "react-router-dom";

const Container = styled('div')({
    boxShadow: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;",
    width:"100%",
    height:"125px",
    boxSizing:"border-box",
    borderRadius:"12px",
    display:"flex",
    padding:"25px",
    alignItems:"center"
})

const Title = styled('Div')({
    fontFamily: "Montserrat, sans-serif",
    color:"#0F1020",
    fontWeight:"800",
    fontSize:"24px"
})

const BlogCard = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const name = props.content["name"].toLowerCase().replaceAll(" ","-");
        navigate(`/blogs/${name}`)
    }

    return (
        <Container onClick={handleClick}>
            <Title>
                {props.content["name"]}
            </Title>
        </Container>
    )
}

export default BlogCard
