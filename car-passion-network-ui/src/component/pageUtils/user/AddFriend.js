import React from "react";
import "./AddFriend.css";

export default function AddFriend({ handleAddFriend }) {
  return (
    <div className="add-friend-container">
      <button className="add-friend-button" onClick={handleAddFriend}>
        Add Friend
      </button>
    </div>
  );
}
