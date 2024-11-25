import React from "react";
import "./GroupProfile.css";
import GroupProfilePicture from "./GroupProfilePicture";

export default function GroupProfile({ groupName }) {
  return (
    <div className="group-profile-container">
      <div className="group-profile-profile-picture-container">
        <GroupProfilePicture />
      </div>

      <label className="group-profile-name"> {groupName}</label>
    </div>
  );
}
