import React from "react";
import "./NavbarButtons.css";

export default function NavbarButtons({ buttons, buttonColor }) {
  return (
    <div className="navbar-buttons-container">
      {buttons.map((button, index) => (
        <div
          key={index}
          className={`navbar-buttons-button ${
            button.isVisible ? "navbar-buttons-button-information-visible" : ""
          }`}
          onClick={button.onClick}
        >
          <img
            src={button.icon}
            alt="icon"
            className="navbar-buttons-button-icon"
          />

          <label
            className="navbar-buttons-label"
            style={{ color: buttonColor }}
          >
            {button.label}
          </label>
        </div>
      ))}
    </div>
  );
}
