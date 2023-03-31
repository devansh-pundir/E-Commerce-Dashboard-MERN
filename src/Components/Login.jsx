import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();
  let data = { mail, password };
  const navigate = useNavigate();
  //   HANDLE LOGIN
  const handleLogin = async () => {
    let res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    res = await res.json();
    console.log(res);
    // SETTING LOCALSTORAGE AND VALID LOGIN ACCESS
    if (res.auth) {
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("token", JSON.stringify(res.auth));
      navigate("/");
    } else {
      alert("Invalid Details");
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
        <h1 className="login-headline">Log In</h1>
        <div className="form">
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
          <button type="submit" onClick={handleLogin}>
            Log In
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
