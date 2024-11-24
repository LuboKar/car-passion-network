import React from "react";
import "./GroupProfile.css";
import GroupProfilePicture from "./GroupProfilePicture";

export default function GroupProfile() {
  return (
    <div className="group-profile-container">
      <GroupProfilePicture />

      <label className="group-profile-name"> Group Name</label>
    </div>
  );
}
