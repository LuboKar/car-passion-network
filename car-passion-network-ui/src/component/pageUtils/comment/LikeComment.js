import React, { useContext } from "react";
import { likeComment } from "../../service/CommentService";
import { PostsContext } from "../../context/PostsProvider";
import liked from "../../../images/liked.png";
import notLiked from "../../../images/not liked.png";
import "./LikeComment.css";

export default function LikeComment({ comment, postIndex, commentIndex }) {
  const { editComment } = useContext(PostsContext);

  const likeOrUnlike = async (event) => {
    event.preventDefault();

    const response = await likeComment(comment);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const likedComment = await response.json();

    editComment(likedComment, commentIndex, postIndex);
  };

  return (
    <div className="like-comment-container" onClick={likeOrUnlike}>
      <img
        src={comment.currentUserLike === true ? liked : notLiked}
        alt="icon"
        className="like-comment-like-icon"
      />
      <label
        className={
          comment.currentUserLike
            ? "like-comment-liked"
            : "like-comment-not-liked"
        }
      >
        Like
      </label>
    </div>
  );
}
