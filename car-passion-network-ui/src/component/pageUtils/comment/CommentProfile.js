import React from "react";
import "./CommentProfile.css";
import useNavigation from "../../service/NavigateService";
import ProfilePicture from "../user/ProfilePicture";

export default function CommentProfile({ comment }) {
  const { navigateToProfile } = useNavigation();

  return (
    <div className="comment-profile-container">
      <div className="comment-profile-picture-container">
        <ProfilePicture
          profilePicture={comment.user.profilePicture}
          navigateToProfile={() => navigateToProfile(comment.user.id)}
        />
      </div>

      <div className="comment-profile-information">
        <label
          className="comment-profile-name"
          onClick={() => navigateToProfile(comment.user.id)}
        >
          {comment.user.firstName} {comment.user.lastName}
        </label>

        <label className="comment-profile-comment-date">
          {comment.createdAt}
        </label>
      </div>
    </div>
  );
}
