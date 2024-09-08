import React from "react";
import liked from "../../../images/liked.png";
import "./ViewCommentLikes.css";

export default function ViewCommentLikes({ comment, clickedLikes }) {
  return (
    <div
      className="show-comment-likes"
      onClick={() => clickedLikes(comment.id)}
    >
      <img src={liked} alt="icon" className={"like-icon"} />
      <label className="comment-likes-number">{comment.likes.length}</label>
    </div>
  );
}
