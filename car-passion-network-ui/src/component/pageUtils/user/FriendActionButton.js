import React from "react";
import "./FriendActionButton.css";

export default function FriendActionButton({ buttonText, handleAction }) {
  return (
    <div className="friend-action-button-container">
      <button className="friend-action-button" onClick={handleAction}>
        {buttonText}
      </button>
    </div>
  );
}
