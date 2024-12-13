import React from "react";
import "./GroupButton.css";

export default function GroupButton({ button }) {
  return (
    <div
      className={`group-button-container ${
        button.isVisible ? "group-button-container-visible" : ""
      }`}
      onClick={button.onClick}
    >
      <label className="group-button-label">{button.label}</label>
    </div>
  );
}
