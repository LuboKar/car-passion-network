import React from "react";
import "./VerticalNavbar.css";

export default function VerticalNavbar({ buttons }) {
  return (
    <div className="navbar-container">
      {buttons.map((button, index) => (
        <div
          key={index}
          className={`vertical-buttons ${
            button.isVisible ? "information-visible" : ""
          }`}
          onClick={button.onClick}
        >
          <img src={button.icon} alt="icon" className="icon" />
          <label>{button.label}</label>
        </div>
      ))}
    </div>
  );
}
