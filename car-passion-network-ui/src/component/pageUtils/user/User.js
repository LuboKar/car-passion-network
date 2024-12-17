import React from "react";
import "./User.css";
import ProfilePicture from "./ProfilePicture";

export default function User({ user, navigateToProfile }) {
  return (
    <div className="user-container">
      <div className="user-picture-container">
        <ProfilePicture
          profilePicture={user.profilePicture}
          navigateToProfile={navigateToProfile}
        />
      </div>

      <label className="user-name" onClick={navigateToProfile}>
        {user.firstName} {user.lastName}
      </label>
    </div>
  );
}
