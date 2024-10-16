import React from "react";
import "./Friends.css";
import Friend from "./Friend";

export default function Friends({ friends, setFriends, userId }) {
  return (
    <div className="friends-container">
      {friends.map((friend, index) => (
        <Friend
          friend={friend}
          index={index}
          userId={userId}
          setFriends={setFriends}
        />
      ))}
    </div>
  );
}
