import React, { useState, useEffect, useRef } from "react";
import "./NavbarSearch.css";
import searchIcon from "../../../images/search.png";
import { findUsersByFullNameStartsWith } from "../../service/UserService";
import pic from "../../../images/profile-pic.jpg";
import useNavigation from "../../service/NavigateService";
import arrow from "../../../images/arrow.png";

export default function NavbarSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const [foundUsersDropdown, setFoundUsersDropdown] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);

  const { navigateToProfile } = useNavigation();

  const debounceTimeout = useRef(null);

  const handleSearchChange = async (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setLoadingResults(true);
  };

  const fetchUsers = async () => {
    if (searchTerm === "") {
      setFoundUsers([]);
      return;
    }

    const response = await findUsersByFullNameStartsWith(searchTerm);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const foundUsers = await response.json();

    setFoundUsers(foundUsers);
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchUsers(searchTerm);
      setLoadingResults(false);
    }, 500);

    setFoundUsersDropdown(searchTerm !== "");
  }, [searchTerm]);

  const navigateToUserProfile = (userId) => {
    navigateToProfile(userId);
    setFoundUsersDropdown(false);
    setFoundUsers([]);
    setSearchTerm("");
  };

  const hideDropdown = () => {
    setFoundUsersDropdown(false);
  };

  const showDropdown = () => {
    if (foundUsers.length > 0) {
      setFoundUsersDropdown(true);
    }
  };

  return (
    <div className="navbar-search-container">
      <div className="navbar-search-field-container">
        <img src={searchIcon} alt="pic" className="friends-search-icon" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="navbar-search-input"
          onClick={showDropdown}
        />
      </div>

      {foundUsersDropdown && (
        <div className="navbar-search-dropdown-container">
          {foundUsers.map((user, index) => (
            <div
              key={index}
              className="navbar-search-dropdown"
              onClick={() => navigateToUserProfile(user.id)}
            >
              <div className="navbar-search-profile-pic-container">
                <img
                  src={
                    user.profilePicture
                      ? `http://localhost:8080/${user.profilePicture}`
                      : pic
                  }
                  alt="user-pic"
                  className="found-user-pic"
                />
              </div>

              <label className="found-user-name">
                {user.firstName} {user.lastName}
              </label>
            </div>
          ))}

          {foundUsers.length < 1 && (
            <div className="search-user-no-results-container">
              <label className="search-user-no-results">
                {loadingResults
                  ? "loading..."
                  : `No results for: ${searchTerm}`}
              </label>
            </div>
          )}
        </div>
      )}
      {foundUsersDropdown && (
        <img
          src={arrow}
          alt="arrow"
          className="navbar-search-dropdown-arrow"
          onClick={hideDropdown}
        />
      )}
    </div>
  );
}
