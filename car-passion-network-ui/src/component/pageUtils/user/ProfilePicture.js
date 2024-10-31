import React from "react";
import "./ProfilePicture.css";
import pic from "../../../images/profile-pic.jpg";

export default function profilePicture({ profilePicture, navigateToProfile }) {
  return (
    <div className="profile-picture-container">
      <img
        src={profilePicture ? `http://localhost:8080/${profilePicture}` : pic}
        alt="profile-pic"
        className="profile-picture-image"
        onClick={navigateToProfile}
      />
    </div>
  );
}
