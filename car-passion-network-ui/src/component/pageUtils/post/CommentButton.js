import React from "react";
import "./CommentButton.css";
import commentIcon from "../../../images/comment-icon.png";

export default function CommentButton({ toggleCommentsFunction }) {
  return (
    <div className="comment-button-container" onClick={toggleCommentsFunction}>
      <img src={commentIcon} alt="icon" className="comment-button-icon" />

      <label className="comment-button-label">Comment</label>
    </div>
  );
}
