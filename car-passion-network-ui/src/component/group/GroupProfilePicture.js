import React from "react";
import "./GroupProfilePicture.css";
import groupImage from "../../images/group image.png";

export default function GroupProfilePicture({ groupPicture }) {
  return (
    <div className="group-profile-picture-container">
      <img
        src={
          groupPicture ? `http://localhost:8080/${groupPicture}` : groupImage
        }
        alt="group-pic"
        className="group-profile-picture-image"
      />
    </div>
  );
}
