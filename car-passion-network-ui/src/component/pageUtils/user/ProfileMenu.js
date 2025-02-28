import React, { useState, useEffect } from "react";
import "./ProfileMenu.css";
import UserActionButton from "./UserActionButton";
import { addFriend, removeFriend, areFriends } from "../../service/UserService";
import { getId } from "../../service/TokenService";

export default function ProfileMenu({ userId }) {
  const [currentUser] = useState(getId());
  const [friends, setFriends] = useState(false);

  const handleAreFriends = async () => {
    const response = await areFriends(currentUser, userId);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();

    setFriends(result);
  };

  const handleAddFriend = async () => {
    const response = await addFriend(userId);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    setFriends(true);
  };

  const handleRemoveFriend = async () => {
    const response = await removeFriend(userId);

    if (response.status !== 204) {
      throw new Error("Network response was not ok");
    }

    setFriends(false);
  };

  useEffect(() => {
    handleAreFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <div className="profile-menu-container">
      {friends ? (
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
