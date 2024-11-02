import React from "react";
import "./EditOption.css";

export default function EditOption({ dropdown, toggleDropdown, text }) {
  return (
    <div
      className={
        !dropdown ? "edit-option-container" : "edit-option-selected-container"
      }
      onClick={toggleDropdown}
    >
      <label className="edit-option-label">{text}</label>

      <label className="edit-option-arrow">
        {dropdown ? "\u25B2" : "\u25BC"}
      </label>
    </div>
  );
}
