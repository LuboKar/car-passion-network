import React from "react";
import replyCommentIcon from "../../../images/comment-icon.png";
import "./ReplyComment.css";

export default function ReplyComment({ comment, toggleReply, clickedReply }) {
  return (
    <div className="reply-comment" onClick={() => toggleReply(comment.id)}>
      <img src={replyCommentIcon} alt="icon" className="reply-comment-icon" />
      <label
        className={
          comment.id === clickedReply ? "reply-clicked-text" : "reply-text"
        }
      >
        Reply
      </label>
    </div>
  );
}
