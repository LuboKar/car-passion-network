import React from "react";
import "./Profile.css";
import pic from "../../../images/profile-pic.jpg";

export default function Profile({ user }) {
  return (
    <div className="profile-container">
      <div className="image-container">
        <img src={pic} alt="profile-pic" className="profile-pic" />
      </div>
      <label className="profile-name">
        {user.firstName} {user.lastName}
      </label>
    </div>
  );
}
