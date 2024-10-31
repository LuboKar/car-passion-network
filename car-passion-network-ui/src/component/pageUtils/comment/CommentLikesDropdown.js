import React from "react";
import "./CommentLikesDropdown.css";
import User from "../user/User";

export default function CommentLikesDropdown({ comment, clickedLikes }) {
  return (
    <div className="comment-likes-drowdown-container">
      <div className="comment-likes-dropdown-menu">
        <label
          className="comment-likes-close-menu"
          onClick={() => clickedLikes(0)}
        >
          X
        </label>
      </div>

      <div className="comment-likes-dropdown">
        {comment.likes.map((user, index) => (
          <User user={user} index={index} />
        ))}
      </div>
    </div>
  );
}
