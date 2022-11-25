import React, { useState} from 'react';
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return(
    <div>
      <h1>PetHub</h1>
      <button onClick={() => navigate("/register")}>Go to Register Page</button>
    </div>
  );
}
export default Home;
