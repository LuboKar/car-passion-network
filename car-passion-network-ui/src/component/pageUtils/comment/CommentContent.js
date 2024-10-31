import React from "react";
import "./CommentContent.css";

export default function CommentContent({ commentContent }) {
  return (
    <div className="comment-content-container">
      <p className="comment-content">{commentContent}</p>
    </div>
  );
}
