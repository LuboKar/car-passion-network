import React from "react";
import "./GroupProfilePicture.css";
import groupImage from "../../images/group image.png";

export default function GroupProfilePicture() {
  return (
    <div className="group-profile-picture-container">
      <img
        src={groupImage}
        alt="group-pic"
        className="group-profile-picture-image"
      />
    </div>
  );
}
