import React from "react";
import "./CommentButton.css";
import commentIcon from "../../images/comment-icon.png";

export default function WriteComment({ toggleCommentsFunction }) {
  return (
    <div className="comment-button-div" onClick={toggleCommentsFunction}>
      <img src={commentIcon} alt="icon" className="comment-icon" />
      <label className="comment-button">Comment</label>
    </div>
  );
}
