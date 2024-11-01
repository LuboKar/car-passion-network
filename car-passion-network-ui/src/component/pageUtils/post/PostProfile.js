import React from "react";
import pic from "../../../images/profile-pic.jpg";
import useNavigation from "../../service/NavigateService";
import "./PostProfile.css";

export default function PostProfile({ post }) {
  const { navigateToProfile } = useNavigation();

  return (
    <div className="post-profile">
      <div className="post-profile-pic-container">
        <img
          src={
            post.author.profilePicture
              ? `http://localhost:8080/${post.author.profilePicture}`
              : pic
          }
          alt="profile-pic"
          className="post-profile-pic"
          onClick={() => navigateToProfile(post.author.id)}
        />
      </div>
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
