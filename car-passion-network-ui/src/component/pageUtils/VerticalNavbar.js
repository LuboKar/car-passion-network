import React from "react";
import "./VerticalNavbar.css";
import info from "../../images/info.png";
import post from "../../images/post.png";

export default function VerticalNavbar({
  toggleInformation,
  togglePosts,
  information,
  posts,
}) {
  return (
    <div className="navbar-container">
      <div
        className={`vertical-buttons ${posts ? "information-visible" : ""}`}
        onClick={togglePosts}
      >
        <img src={post} alt="postpic" className="icon" />
        <label>Posts</label>
      </div>
      <div
        className={`vertical-buttons ${
          information ? "information-visible" : ""
        }`}
        onClick={toggleInformation}
      >
        <img src={info} alt="informationpic" className="icon" />
        <label>Information</label>
      </div>
    </div>
  );
}
