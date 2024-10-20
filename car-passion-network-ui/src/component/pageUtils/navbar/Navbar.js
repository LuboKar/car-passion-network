import React from "react";
import "./Navbar.css";
import logo from "../../../images/car-logo.png";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../Authentication/Authentication.js";
import NavbarDropdown from "./NavbarDropdown.js";
import NavbarSearch from "./NavbarSearch.js";

export default function Navbar() {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    } else navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={handleClick}>
        <img src={logo} alt="CPN" className="navbar-logo-image" />
        <p className="navbar-logo-header">Car Passion Network</p>
      </div>

      <NavbarSearch />

      <NavbarDropdown />
    </nav>
  );
}
