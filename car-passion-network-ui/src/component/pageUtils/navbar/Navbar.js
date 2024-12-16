import React from "react";
import "./Navbar.css";
import logo from "../../../images/car-logo.png";
import NavbarDropdown from "./NavbarDropdown.js";
import NavbarSearch from "./NavbarSearch.js";
import useNavigation from "../../service/NavigateService.js";

export default function Navbar() {
  const { navigateToFeedPage } = useNavigation();

  return (
    <nav className="navbar">
      <div className="navbar-logo-container" onClick={navigateToFeedPage}>
        <img src={logo} alt="CPN" className="navbar-logo-image" />
        <p className="navbar-logo-header">Car Passion Network</p>
      </div>

      <NavbarSearch />

      <NavbarDropdown />
    </nav>
  );
}
