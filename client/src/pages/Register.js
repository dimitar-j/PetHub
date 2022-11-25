import React, { useState} from 'react';
import { Link, useNavigate } from "react-router-dom";

import Axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const addUser = () => {
    Axios.post("http://localhost:3001/create-user", {
      name: name,
      email: email,
      password: password,
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="App">
      <button onClick={() => navigate("/")}>Back to home page</button>
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Email:</label>
        <input
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label>Password:</label>
        <input
          type="text"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <button onClick={addUser}>Register</button>
    </div>
  );
}

export default Register;
