import React from "react";
import liked from "../../../images/liked.png";
import "./ViewCommentLikes.css";

export default function ViewCommentLikes({ comment, clickedLikes }) {
  return (
    <div
      className="view-comment-likes-container"
      onClick={() => clickedLikes(comment.id)}
    >
      <img src={liked} alt="icon" className="view-comment-likes-like-icon" />

      <label className="view-comment-likes-number">
        {comment.likes.length}
      </label>
    </div>
  );
}
