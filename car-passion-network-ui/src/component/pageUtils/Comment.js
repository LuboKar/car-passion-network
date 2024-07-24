import React from "react";
import pic from "../../images/profile-pic.jpg";
import liked from "../../images/liked.png";
import notLiked from "../../images/not liked.png";
import "./Comment.css";
import { likeComment } from "../service/CommentService";

export default function Comment({
  comment,
  index,
  navigateToProfile,
  toggleCommentLike,
  postIndex,
}) {
  const likeOrUnlike = async (event) => {
    event.preventDefault();

    const response = await likeComment(comment);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const likedComment = await response.json();

    toggleCommentLike(postIndex, index, likedComment);
  };
  return (
    <div key={index} className="view-comment-container">
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
      <p className="comment-content">{comment.content}</p>

      <div className="like-comment" onClick={likeOrUnlike}>
        <img
          src={comment.currentUserLike === true ? liked : notLiked}
          alt="icon"
          className="like-icon"
        />
        <label className="like-text">Like</label>
      </div>
    </div>
  );
}
