import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/register");
  };
  return (
    <>
      <div className="wrapper">
        <nav className="navbar">
          <div className="navbar-links">
            <ul>
              {auth ? (
                <>
                  <li>
                    <Link to="/">Products</Link>
                  </li>
                  <li>
                    <Link to="/add">Add Product</Link>
                  </li>
                  <li>
                    <Link to="/update">Update Product</Link>
                  </li>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/register" onClick={logOut}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                  <li>
                    <Link to="/login">Log In</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
