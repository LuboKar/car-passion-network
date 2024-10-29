import React from "react";
import "./VerticalNavbar.css";

export default function VerticalNavbar({ topButtons, bottomButtons }) {
  return (
    <div className="navbar-container">
      <div className="navbar-top-bottons">
        {topButtons.map((button, index) => (
          <div
            key={index}
            className={`vertical-buttons ${
              button.isVisible ? "information-visible" : ""
            }`}
            onClick={button.onClick}
          >
            <img src={button.icon} alt="icon" className="icon" />
            <label className="vertical-top-buttons-label">{button.label}</label>
          </div>
        ))}
      </div>

      {bottomButtons && (
        <div className="navbar-bottom-buttons">
          {bottomButtons.map((button, index) => (
            <div
              key={index}
              className={`vertical-buttons ${
                button.isVisible ? "information-visible" : ""
              }`}
              onClick={button.onClick}
            >
              <img src={button.icon} alt="icon" className="icon" />
              <label className="vertical-bottom-buttons-label">
                {button.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
