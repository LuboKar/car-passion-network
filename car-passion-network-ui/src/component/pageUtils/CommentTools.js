import React, { useState } from "react";
import { likeComment } from "../service/CommentService";
import liked from "../../images/liked.png";
import notLiked from "../../images/not liked.png";
import replyCommentIcon from "../../images/comment-icon.png";
import "./CommentTools.css";
import pic from "../../images/profile-pic.jpg";

export default function CommentTool({
  comment,
  editComment,
  postIndex,
  commentIndex,
  toggleReply,
  clickedReply,
  navigateToProfile,
}) {
  const [clickdLikedCommentId, setClickdLikedCommentId] = useState(0);

  const clickedLikes = (id) => {
    if (clickdLikedCommentId === 0) {
      setClickdLikedCommentId(id);
    } else setClickdLikedCommentId(0);
  };

  const likeOrUnlike = async (event) => {
    event.preventDefault();

    const response = await likeComment(comment);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const likedComment = await response.json();

    editComment(postIndex, commentIndex, likedComment);
  };

  return (
    <div className="comment-tools-container">
      <div className="comment-tools">
        <div className="like-comment" onClick={likeOrUnlike}>
          <img
            src={comment.currentUserLike === true ? liked : notLiked}
            alt="icon"
            className="like-icon"
          />
          <label className={comment.currentUserLike ? "liked" : "notLiked"}>
            Like
          </label>
        </div>

        {comment.depth < 5 && (
          <div
            className="reply-comment"
            onClick={() => toggleReply(comment.id)}
          >
            <img
              src={replyCommentIcon}
              alt="icon"
              className="reply-comment-icon"
            />
            <label
              className={
                comment.id === clickedReply
                  ? "reply-clicked-text"
                  : "reply-text"
              }
            >
              Reply
            </label>
          </div>
        )}

        {comment.likes.length > 0 && (
          <div
            className="show-comment-likes"
            onClick={() => clickedLikes(comment.id)}
          >
            <img src={liked} alt="icon" className={"like-icon"} />
            <label className="comment-likes-number">
              {comment.likes.length}
            </label>
          </div>
        )}
      </div>

      {clickdLikedCommentId === comment.id && (
        <div className="comment-likes-drowdown-container">
          <div className="dropdown-menu">
            <label className="close-likes" onClick={() => clickedLikes(0)}>
              X
            </label>
          </div>
          <div className="comment-likes-dropdown">
            {comment.likes.map((user, index) => (
              <div
                key={index}
                className="comment-likes-container"
                onClick={() => navigateToProfile(user.id)}
              >
                <img src={pic} alt="user-pic" className="user-like-pic" />
                <label key={index} className="user-like-name">
                  {user.firstName} {user.lastName}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
