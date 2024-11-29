import React from "react";
import "./DropdownButton.css";

export default function DropdownButton({
  buttonIcon,
  buttonText,
  buttonOnClick,
}) {
  return (
    <div className="dropdown-button-container">
      <div className="dropdown-button-option" onClick={buttonOnClick}>
        <img
          src={buttonIcon}
          alt="option-pic"
          className="dropdown-button-option-icon"
        />
        <label className="dropdown-button-option-label">{buttonText}</label>
      </div>
    </div>
  );
}
