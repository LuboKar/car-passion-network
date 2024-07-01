import React from "react";
import "./LikePost.css";
import liked from "../../images/liked.png";
import notLiked from "../../images/not liked.png";
import { likePost } from "../service/PostService";

export default function LikePost({ post, toggleLike }) {
  const likeOrDislike = async (event) => {
    event.preventDefault();

    const response = await likePost(post);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    toggleLike();
  };

  return (
    <div className="like-post-container">
      <div className="like-post-text-container" onClick={likeOrDislike}>
        <img
          src={post.currentUserLike === true ? liked : notLiked}
          alt="icon"
          className="liked-icon"
        />
        <label className="like-post-text">Like</label>
      </div>
    </div>
  );
}
