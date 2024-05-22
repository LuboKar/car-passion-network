import React from "react";
import "../pageUtils/Profile.css";
import pic from "../../images/profile-pic.jpg";

export default function Profile() {
  return (
    <div className="profile-container">
      <div className="image-container">
        <img src={pic} alt="profile-pic" className="profile-pic" />
      </div>
      <label className="profile-name">John Doe</label>
    </div>
  );
}
