import React from "react";
import pic from "../../../images/profile-pic.jpg";
import send from "../../../images/send.png";
import cannotSend from "../../../images/cannot-send.png";
import "./WriteReply.css";

export default function WriteReply({
  reply,
  handleInputChange,
  sendButton,
  commentReply,
}) {
  return (
    <div className="reply-comment-input">
      <img src={pic} alt="pic" className="write-comment-profile-pic" />
      <input
        className="comment-input"
        placeholder="Reply...."
        type="text"
        name="content"
        value={reply.content}
        onChange={handleInputChange}
      />
      {!sendButton && (
        <img src={cannotSend} alt="pic" className="cannont-send-comment" />
      )}
      {sendButton && (
        <img
          src={send}
          alt="pic"
          className="send-comment"
          onClick={commentReply}
        />
      )}
    </div>
  );
}
