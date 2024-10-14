import React from "react";
import "./AddFriend.css";
import { addFriend } from "../../service/UserService";

export default function AddFriend({ userId, setUser }) {
  const handleClick = async () => {
    const response = await addFriend(userId);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const friendUser = await response.json();
    setUser(friendUser);
  };

  return (
    <div className="add-friend-container">
      <button className="add-friend-button" onClick={handleClick}>
        Add Friend
      </button>
    </div>
  );
}
