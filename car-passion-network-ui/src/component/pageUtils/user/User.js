import React from "react";
import "./User.css";
import ProfilePicture from "./ProfilePicture";

export default function User({ user, index, navigateToProfile }) {
  return (
    <div key={index} className="user-container" onClick={navigateToProfile}>
      <div className="user-picture-container">
        <ProfilePicture profilePicture={user.profilePicture} />
      </div>

      <label key={index} className="user-name">
        {user.firstName} {user.lastName}
      </label>
    </div>
  );
}
