import React from "react";
import "./User.css";
import pic from "../../../images/profile-pic.jpg";

export default function User({ user, index, navigateToProfile }) {
  return (
    <div
      key={index}
      className="comment-likes-container"
      onClick={navigateToProfile}
    >
      <div className="comment-user-like-pic-container">
        <img
          src={
            user.profilePicture
              ? `http://localhost:8080/${user.profilePicture}`
              : pic
          }
          alt="user-pic"
          className="user-like-pic"
        />
      </div>
      <label key={index} className="user-like-name">
        {user.firstName} {user.lastName}
      </label>
    </div>
  );
}
