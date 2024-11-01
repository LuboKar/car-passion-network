import React from "react";
import "./PostMenuButton.css";

export default function PostButton({ buttonIcon, buttonText, openPost }) {
  return (
    <div className="post-menu-button-container">
      <div className="post-menu-option" onClick={openPost}>
        <img
          src={buttonIcon}
          alt="option-pic"
          className="post-menu-option-icon"
        />
        <label className="post-menu-option-label">{buttonText}</label>
      </div>
    </div>
  );
}
