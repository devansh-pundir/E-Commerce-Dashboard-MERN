import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  // Input States
  const [name, setName] = useState();
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();
  let data = { name, mail, password };
  // Navigation
  const navigate = useNavigate();
  // Sign Up API
  const collectData = async () => {
    let res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    res = await res.json();
    console.log(res);
    // SETTING LOCALSTORAGE
    localStorage.setItem("user", JSON.stringify(res.res));
    localStorage.setItem("token", JSON.stringify(res.auth));
    if (res) {
      navigate("/");
    }
  };
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });
  return (
    <>
      <div className="wrapper">
        <h1 className="register-headline">Register</h1>
        <div className="form">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Mail"
            name="mail"
            value={mail}
            onChange={(event) => {
              setMail(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Passcode"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button type="submit" onClick={collectData}>
            Register
          </button>
        </div>
      </div>
    </>
  );
}

export default Register;
