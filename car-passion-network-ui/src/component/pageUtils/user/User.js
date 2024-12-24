import React from "react";
import "./User.css";
import ProfilePicture from "./ProfilePicture";
import defaultProfilePicture from "../../../images/profile-pic.jpg";

export default function User({ user, navigateToProfile }) {
  return (
    <div className="user-container">
      <div className="user-picture-container">
        <ProfilePicture
          profilePicture={user.profilePicture}
          defaultProfilePicture={defaultProfilePicture}
          navigateToProfile={navigateToProfile}
        />
      </div>

      <label className="user-name" onClick={navigateToProfile}>
        {user.firstName} {user.lastName}
      </label>
    </div>
  );
}
