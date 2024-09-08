import React, { useState, useRef, useEffect } from "react";
import pic from "../../../images/profile-pic.jpg";
import useNavigation from "../../service/NavigateService";
import { Link } from "react-router-dom";
import settings from "../../../images/settings.png";
import { logoutUser } from "../../service/AuthenticationService";
import logoutIcon from "../../../images/logout.png";
import { getId } from "../../service/TokenService";

export default function NavbarDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { navigateToProfile, navigateToDashboardPage } = useNavigation();

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

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const logout = async () => {
    const response = await logoutUser();

    if (!response.ok) {
      return;
    }

    localStorage.removeItem("jwtToken");

    navigateToDashboardPage();
  };

  return (
    <div className="dropdown-container">
      <img
        src={pic}
        alt="profilepic"
        className="dropdown-icon"
        onClick={toggleOptions}
      />

      {isOpen && (
        <div className="dropdown" ref={dropdownRef}>
          <div
            className="profile-span"
            onClick={() => navigateToProfile(getId())}
          >
            <img src={pic} alt="profilepic" className="span-icon" />
            <span>Profile</span>
          </div>
          <Link to="/" className="link">
            <div className="profile-span">
              <img src={settings} alt="profilepic" className="span-icon" />
              <span>Settings</span>
            </div>
          </Link>
          <div className="profile-span" onClick={logout}>
            <img src={logoutIcon} alt="profilepic" className="span-icon" />
            <span>Logout</span>
          </div>
        </div>
      )}
    </div>
  );
}
