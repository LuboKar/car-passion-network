import React from "react";
import "./PostProfileInformation.css";
import ProfilePicture from "../user/ProfilePicture";
import defaultProfilePicture from "../../../images/profile-pic.jpg";
import useNavigation from "../../service/NavigateService";

export default function PostProfileInformation({ post }) {
  const { navigateToProfile } = useNavigation();

  return (
    <div className="post-profile-information-container">
      <div className="post-profile-information-profile-picture-container">
        <ProfilePicture
          profilePicture={post.author.profilePicture}
          defaultProfilePicture={defaultProfilePicture}
          navigateToProfile={() => navigateToProfile(post.author.id)}
        />
      </div>

      <div className="post-profile-information-user-date-container">
        <h1
          className="post-profile-information-user-name"
          onClick={() => navigateToProfile(post.author.id)}
        >
          {post.author.firstName} {post.author.lastName}
        </h1>

        <label className="post-profile-information-date-label">
          {post.createdAt}
        </label>
      </div>
    </div>
  );
}
