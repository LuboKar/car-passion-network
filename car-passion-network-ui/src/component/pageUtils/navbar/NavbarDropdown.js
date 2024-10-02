import React, { useState, useRef, useEffect } from "react";
import pic from "../../../images/profile-pic.jpg";
import useNavigation from "../../service/NavigateService";
import settings from "../../../images/settings.png";
import { logoutUser } from "../../service/AuthenticationService";
import logoutIcon from "../../../images/logout.png";
import { getId } from "../../service/TokenService";
import { deleteToken } from "../../service/TokenService";
import "./NavbarDropdown.css";
import { getProfilePictureUrl } from "../../service/profilePictureService";

export default function NavbarDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { navigateToProfile, navigateToDashboardPage, navigateToSettingsPage } =
    useNavigation();
  const profilePicture = getProfilePictureUrl();

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

    deleteToken();

    navigateToDashboardPage();
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-icon-container">
        <img
          src={profilePicture ? `http://localhost:8080/${profilePicture}` : pic}
          alt="profilepic"
          className="dropdown-icon"
          onClick={toggleOptions}
        />
      </div>

      {isOpen && (
        <div className="dropdown" ref={dropdownRef}>
          <div
            className="profile-span"
            onClick={() => navigateToProfile(getId())}
          >
            <div className="dropdown-profile-picture-container">
              <img
                src={
                  profilePicture
                    ? `http://localhost:8080/${profilePicture}`
                    : pic
                }
                alt="profilepic"
                className="profile-picture-icon"
              />
            </div>
            <span>Profile</span>
          </div>

          <div className="profile-span" onClick={navigateToSettingsPage}>
            <img src={settings} alt="profilepic" className="span-icon" />
            <span>Settings</span>
          </div>

          <div className="profile-span" onClick={logout}>
            <img src={logoutIcon} alt="profilepic" className="span-icon" />
            <span>Logout</span>
          </div>
        </div>
      )}
    </div>
  );
}
