import React from "react";
import "./ProfileMenu.css";
import UserActionButton from "./UserActionButton";
import { addFriend, removeFriend } from "../../service/UserService";

export default function ProfileMenu({ user, setUser }) {
  const handleAddFriend = async () => {
    const response = await addFriend(user.id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const friendUser = await response.json();

    setUser(friendUser);
  };

  const handleRemoveFriend = async () => {
    const response = await removeFriend(user.id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const friendUser = await response.json();

    setUser(friendUser);
  };
  return (
    <div className="profile-menu-container">
      {user.friend ? (
        <UserActionButton
          buttonText="Remove Friend"
          handleAction={handleRemoveFriend}
        />
      ) : (
        <UserActionButton
          buttonText="Add Friend"
          handleAction={handleAddFriend}
        />
      )}
    </div>
  );
}
