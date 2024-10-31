import React from "react";
import replyCommentIcon from "../../../images/comment-icon.png";
import "./ReplyComment.css";

export default function ReplyComment({ comment, toggleReply, clickedReply }) {
  return (
    <div
      className="reply-comment-container"
      onClick={() => toggleReply(comment.id)}
    >
      <img src={replyCommentIcon} alt="icon" className="reply-comment-icon" />

      <label
        className={
          comment.id === clickedReply
            ? "reply-comment-clicked-text"
            : "reply-comment-text"
        }
      >
        Reply
      </label>
    </div>
  );
}
