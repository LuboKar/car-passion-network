import React from "react";
import "./NumberOfComments.css";
import commentIcon from "../../../images/comment-icon.png";

export default function NumberOfComments({ post, toggleCommentsFunction }) {
  return (
    <div className="number-of-comments-container">
      {post.comments.length > 0 && (
        <div className="number-of-posts-info" onClick={toggleCommentsFunction}>
          <img
            src={commentIcon}
            alt="comment icon"
            className="number-of-comments-icon"
          />
          <label className="post-comments-length">{post.comments.length}</label>
        </div>
      )}
    </div>
  );
}
