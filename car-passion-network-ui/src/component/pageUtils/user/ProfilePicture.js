import React from "react";
import "./ProfilePicture.css";

export default function profilePicture({
  profilePicture,
  defaultProfilePicture,
  navigateToProfile,
}) {
  return (
    <div className="profile-picture-container">
      <img
        src={
          profilePicture
            ? `http://localhost:8080/${profilePicture}`
            : defaultProfilePicture
        }
        alt="profile-pic"
        className="profile-picture-image"
        onClick={navigateToProfile}
      />
    </div>
  );
}
