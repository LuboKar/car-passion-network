import React from "react";
import pic from "../../../images/profile-pic.jpg";
import "./CommentProfile.css";
import useNavigation from "../../service/NavigateService";

export default function CommentProfile({ comment }) {
  const { navigateToProfile } = useNavigation();

  return (
    <div className="comment-profile">
      <div className="comment-profile-pic-container">
        <img
          src={
            comment.user.profilePicture
              ? `http://localhost:8080/${comment.user.profilePicture}`
              : pic
          }
          alt="profile-pic"
          className="comment-profile-pic"
          onClick={() => navigateToProfile(comment.user.id)}
        />
      </div>
      <div className="comment-profile-information">
        <label
          className="comment-profile-name"
          onClick={() => navigateToProfile(comment.user.id)}
        >
          {comment.user.firstName} {comment.user.lastName}
        </label>
        <label className="comment-date">{comment.createdAt}</label>
      </div>
    </div>
  );
}
