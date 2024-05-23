import React from "react";
import "./VerticalNavbar.css";
import info from "../../images/info.png";

export default function VerticalNavbar({ toggleInformation, information }) {
  return (
    <div className="navbar-container">
      <div
        className={`vertical-buttons ${
          information ? "information-visible" : ""
        }`}
        onClick={toggleInformation}
      >
        <img src={info} alt="profilepic" className="icon" />
        <label>Information</label>
      </div>
    </div>
  );
}
