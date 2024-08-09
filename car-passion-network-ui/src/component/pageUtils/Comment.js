import React, { useState, useEffect } from "react";
import pic from "../../images/profile-pic.jpg";
import liked from "../../images/liked.png";
import notLiked from "../../images/not liked.png";
import replyCommentIcon from "../../images/comment-icon.png";
import "./Comment.css";
import { likeComment } from "../service/CommentService";
import send from "../../images/send.png";
import cannotSend from "../../images/cannot-send.png";
import { replyComment } from "../service/CommentService";

export default function Comment({
  comment,
  commentIndex,
  navigateToProfile,
  editComment,
  postIndex,
  postId,
}) {
  const [clickdLikedCommentId, setClickdLikedCommentId] = useState(0);
  const [clickedReply, setClickedReply] = useState(0);

  const [reply, setReply] = useState({
    postId: postId,
    content: "",
    parentCommentId: comment.id,
  });

  const [sendButton, setSendButton] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setReply((contentValue) => ({
      ...contentValue,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (reply.content === "") {
      setSendButton(false);
    } else setSendButton(true);
  }, [reply.content]);

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

  const toggleReply = (id) => {
    if (clickedReply === 0) {
      setClickedReply(id);
    } else setClickedReply(0);
  };

  const commentReply = async (event) => {
    event.preventDefault();
    if (comment.content === "") return;

    const response = await replyComment(reply);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    setReply((prevReply) => ({
      ...prevReply,
      content: "",
    }));

    const repliedComment = await response.json();

    editComment(postIndex, commentIndex, repliedComment);
    toggleReply(0);
    toggleReplies();
  };

  const toggleReplies = () => {
    setShowReplies(true);
  };

  return (
    <div key={commentIndex} className="view-comment-container">
      {showReplies && <div className="vertical-line"></div>}
      {comment.replies && !showReplies && comment.replies.length > 0 && (
        <div className="show-replies-horizontal-line"></div>
      )}
      <div className="comment-profile">
        <img
          src={pic}
          alt="profile-pic"
          className="comment-profile-pic"
          onClick={() => navigateToProfile(comment.user.id)}
        />
        <label
          className="comment-profile-name"
          onClick={() => navigateToProfile(comment.user.id)}
        >
          {comment.user.firstName} {comment.user.lastName}
        </label>

        <label className="comment-date">{comment.createdAt}</label>
      </div>
      <p className="comment-content">{comment.content}</p>
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

      {clickedReply === comment.id && (
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
      )}

      {!showReplies && comment.replies && comment.replies.length > 0 && (
        <div className="show-replies-tool">
          <label className="show-replies" onClick={toggleReplies}>
            show {comment.replies.length} replies
          </label>
        </div>
      )}

      {showReplies && (
        <div>
          {comment.replies &&
            comment.replies.map((reply, index) => (
              <div>
                <div className="horizontal-line"></div>
                {index === comment.replies.length - 1 && (
                  <div className="fixing-line"></div>
                )}
                <div className="view-replies" key={index}>
                  <Comment
                    comment={reply}
                    commentIndex={commentIndex}
                    navigateToProfile={navigateToProfile}
                    editComment={editComment}
                    postIndex={postIndex}
                    postId={postId}
                  />
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
