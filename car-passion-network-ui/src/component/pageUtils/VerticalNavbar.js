import React from "react";
import "./VerticalNavbar.css";
import info from "../../images/info.png";
import post from "../../images/post.png";

export default function VerticalNavbar({
  toggleInformation,
  togglePosts,
  userInformation,
  viewPosts,
}) {
  return (
    <div className="navbar-container">
      <div
        className={`vertical-buttons ${viewPosts ? "information-visible" : ""}`}
        onClick={togglePosts}
      >
        <img src={post} alt="postpic" className="icon" />
        <label>Posts</label>
      </div>
      <div
        className={`vertical-buttons ${
          userInformation ? "information-visible" : ""
        }`}
        onClick={toggleInformation}
      >
        <img src={info} alt="informationpic" className="icon" />
        <label>Information</label>
      </div>
    </div>
  );
}
