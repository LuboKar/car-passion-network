import React from "react";
import "./UserActionButton.css";

export default function UserActionButton({ buttonText, handleAction }) {
  return (
    <div className="friend-action-button-container">
      <button className="friend-action-button" onClick={handleAction}>
        {buttonText}
      </button>
    </div>
  );
}
