import React from "react";
import "./RemoveFriend.css";
import { removeFriend } from "../../service/UserService";

export default function RemoveFriend({ userId, setUser }) {
  const handleClick = async () => {
    const response = await removeFriend(userId);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const friendUser = await response.json();
    setUser(friendUser);
  };

  return (
    <div className="remove-friend-container">
      <button className="remove-friend-button" onClick={handleClick}>
        Remove Friend
      </button>
    </div>
  );
}
