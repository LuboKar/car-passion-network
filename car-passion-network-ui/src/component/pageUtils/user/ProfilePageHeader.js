import React from "react";
import "./ProfilePageHeader.css";

export default function ProfilePageHeader() {
  return (
    <div className="profile-page-header-container">
      <label className="profile-page-header-text">
        You haven’t posted anything yet.
      </label>
      <label className="profile-page-header-text">
        Start by sharing your first post.
      </label>
    </div>
  );
}
