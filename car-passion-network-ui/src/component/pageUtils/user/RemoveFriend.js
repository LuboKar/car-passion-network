import React from "react";
import "./RemoveFriend.css";

export default function RemoveFriend({ handleRemoveFriend }) {
  return (
    <div className="remove-friend-container">
      <button className="remove-friend-button" onClick={handleRemoveFriend}>
        Remove Friend
      </button>
    </div>
  );
}
