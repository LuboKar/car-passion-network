import React from "react";
import pic from "../../../images/profile-pic.jpg";
import "./CommentProfile.css";
import useNavigation from "../../service/NavigateService";

export default function CommentProfile({ comment }) {
  const { navigateToProfile } = useNavigation();

  return (
    <div className="comment-profile">
      <img
        src={pic}
        alt="profile-pic"
        className="comment-profile-pic"
        onClick={() => navigateToProfile(comment.user.id)}
      />
      <label
        className="comment-profile-name"
        onClick={() => navigateToProfile(comment.user.id)}
      >
        {comment.user.firstName} {comment.user.lastName}
      </label>

      <label className="comment-date">{comment.createdAt}</label>
    </div>
  );
}
