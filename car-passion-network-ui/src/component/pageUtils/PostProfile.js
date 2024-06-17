import React from "react";
import pic from "../../images/profile-pic.jpg";
import open from "../../images/Open.png";

export default function PostProfile({ post, navigateToProfile }) {
  return (
    <div className="post-profile">
      <img
        src={pic}
        alt="profile-pic"
        className="post-profile-pic"
        onClick={() => navigateToProfile(post.user.id)}
      />
      <div className="post-profile-information">
        <h1
          className="post-user-name"
          onClick={() => navigateToProfile(post.user.id)}
        >
          {post.user.firstName} {post.user.lastName}
        </h1>
        <label className="post-date">{post.createdAt}</label>
      </div>
      <img src={open} alt="open-pic" className="open-pic" />
    </div>
  );
}
