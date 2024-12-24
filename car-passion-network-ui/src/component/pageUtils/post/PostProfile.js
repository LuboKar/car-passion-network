import React from "react";
import useNavigation from "../../service/NavigateService";
import "./PostProfile.css";
import ProfilePicture from "../user/ProfilePicture";
import defaultProfilePicture from "../../../images/profile-pic.jpg";

export default function PostProfile({ post }) {
  const { navigateToProfile } = useNavigation();

  return (
    <div className="post-profile-container">
      <div className="post-profile-profile-picture-container">
        <ProfilePicture
          profilePicture={post.author.profilePicture}
          defaultProfilePicture={defaultProfilePicture}
          navigateToProfile={() => navigateToProfile(post.author.id)}
        />
      </div>

      <div className="post-profile-information">
        <h1
          className="post-profile-user-name"
          onClick={() => navigateToProfile(post.author.id)}
        >
          {post.author.firstName} {post.author.lastName}
        </h1>

        <label className="post-profile-date-label">{post.createdAt}</label>
      </div>
    </div>
  );
}
