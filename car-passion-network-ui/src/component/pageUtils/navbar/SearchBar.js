import React from "react";
import "./SearchBar.css";
import searchIcon from "../../../images/search.png";

export default function SearchBar({ searchTerm, handleSearchChange }) {
  return (
    <div className="search-bar-container">
      <img src={searchIcon} alt="pic" className="search-bar-icon" />

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar-input"
      />
    </div>
  );
}
