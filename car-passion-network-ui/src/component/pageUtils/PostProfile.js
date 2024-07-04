import React from "react";
import pic from "../../images/profile-pic.jpg";

export default function PostProfile({ post, navigateToProfile }) {
  return (
    <div className="post-profile">
      <img
        src={pic}
        alt="profile-pic"
        className="post-profile-pic"
        onClick={() => navigateToProfile(post.author.id)}
      />
      <div className="post-profile-information">
        <h1
          className="post-user-name"
          onClick={() => navigateToProfile(post.author.id)}
        >
          {post.author.firstName} {post.author.lastName}
        </h1>
        <label className="post-date">{post.createdAt}</label>
      </div>
    </div>
  );
}
