import React, { useState, useRef, useEffect } from "react";
import useNavigation from "../../service/NavigateService";
import settings from "../../../images/settings.png";
import { logoutUser } from "../../service/AuthenticationService";
import logoutIcon from "../../../images/logout.png";
import { getId } from "../../service/TokenService";
import { deleteToken } from "../../service/TokenService";
import "./NavbarDropdown.css";
import { getProfilePictureUrl } from "../../service/profilePictureService";
import ProfilePicture from "../user/ProfilePicture";

export default function NavbarDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const id = getId();

  const dropdownRef = useRef(null);

  const { navigateToProfile, navigateToFeedPage, navigateToSettingsPage } =
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
    navigateToFeedPage();
  };

  return (
    <div className="navbar-dropdown-container">
      <div className="dropdown-icon-container" onClick={toggleOptions}>
        <ProfilePicture profilePicture={profilePicture} />
      </div>

      {isOpen && (
        <div className="navbar-dropdown" ref={dropdownRef}>
          <div
            className="navbar-dropdown-button"
            onClick={() => navigateToProfile(id)}
          >
            <div className="navbar-dropdown-profile-picture-container">
              <ProfilePicture profilePicture={profilePicture} />
            </div>

            <span>Profile</span>
          </div>

          <div
            className="navbar-dropdown-button"
            onClick={navigateToSettingsPage}
          >
            <img
              src={settings}
              alt="profilepic"
              className="navbar-dropdown-button-icon"
            />

            <span>Settings</span>
          </div>

          <div className="navbar-dropdown-button" onClick={logout}>
            <img
              src={logoutIcon}
              alt="profilepic"
              className="navbar-dropdown-button-icon"
            />

            <span>Logout</span>
          </div>
        </div>
      )}
    </div>
  );
}
