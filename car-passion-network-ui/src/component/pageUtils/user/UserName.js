import React from "react";
import "./UserName.css";

export default function UserName({ user }) {
  return (
    <div className="user-name-container">
      <label className="profile-name">
        {user.firstName} {user.lastName}
      </label>
    </div>
  );
}
