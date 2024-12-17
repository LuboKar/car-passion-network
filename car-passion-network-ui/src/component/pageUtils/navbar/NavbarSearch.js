import React, { useState, useEffect, useRef } from "react";
import "./NavbarSearch.css";
import { findUsersByFullNameStartsWith } from "../../service/UserService";
import useNavigation from "../../service/NavigateService";
import arrow from "../../../images/arrow.png";
import SearchBar from "./SearchBar";
import User from "../user/User";

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
    setLoadingResults(false);
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchUsers(searchTerm);
    }, 500);

    setFoundUsersDropdown(searchTerm !== "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="navbar-search-field-container" onClick={showDropdown}>
        <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
      </div>

      {foundUsersDropdown && (
        <div className="navbar-search-dropdown-container">
          {foundUsers.map((user, index) => (
            <div
              key={index}
              className="navbar-search-dropdown-user"
              onClick={() => navigateToUserProfile(user.id)}
            >
              <User user={user} />
            </div>
          ))}

          {foundUsers.length < 1 && (
            <div className="navbar-search-dropdown-no-results-container">
              <label className="navbar-search-dropdown-no-results">
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
