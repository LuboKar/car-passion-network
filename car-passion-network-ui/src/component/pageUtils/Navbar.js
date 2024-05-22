import React from "react";
import "./Navbar.css";
import logo from "../../images/car-logo.png";
import pic from "../../images/profile-pic.jpg";
import settings from "../../images/settings.png";
import logout from "../../images/logout.png";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../Authentication/Authentication.js";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    } else navigate("/");
  };

  const navigateToProfile = () => {
    if (isAuthenticated()) {
      navigate(`/profile`);
    } else navigate("/");
  };

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/authentication/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        return;
      }

      localStorage.removeItem("jwtToken");

      navigate("/");
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={handleClick}>
        <img src={logo} alt="CPN" className="navbar-logo-image" />
        <p className="navbar-logo-header">Car Passion Network</p>
      </div>
      <div className="dropdown-container">
        <img
          src={pic}
          alt="profilepic"
          className="dropdown-icon"
          onClick={toggleOptions}
        />
        {isOpen && (
          <div className="dropdown" ref={dropdownRef}>
            <div className="profile-span" onClick={navigateToProfile}>
              <img src={pic} alt="profilepic" className="span-icon" />
              <span>Profile</span>
            </div>
            <Link to="/" className="link">
              <div className="profile-span">
                <img src={settings} alt="profilepic" className="span-icon" />
                <span>Settings</span>
              </div>
            </Link>
            <div className="profile-span" onClick={handleLogout}>
              <img src={logout} alt="profilepic" className="span-icon" />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
