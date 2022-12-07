import React, { useState } from "react";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";

const Container = styled("div")({
  boxShadow:
    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
  width: "100%",
  height: "fit-content",
  boxSizing: "border-box",
  borderRadius: "12px",
  display: "flex",
  padding: "25px",
  alignItems: "flex-start",
  flexDirection: "column",
  justifyContent: "center",
  gap: "5px",
});

const Title = styled("Div")({
  fontFamily: "Montserrat, sans-serif",
  color: "#0F1020",
  fontWeight: "400",
  fontSize: "20px",
});
const Subtitle = styled("Div")({
  fontFamily: "Montserrat, sans-serif",
  color: "rgba(0,0,0,0.5)",
  fontWeight: "300",
  fontSize: "16px",
});

const BlogCard = (props) => {
  return (
    <Container>
      <Subtitle>{props.content["fname"] + " " + props.content["lname"]}</Subtitle>
      <Title>{props.content["content"]}</Title>
    </Container>
  );
};

export default BlogCard;
