import React, { memo } from "react";
import "./LikePost.css";
import liked from "../../../images/liked.png";
import notLiked from "../../../images/not liked.png";

const LikePost = memo(({ post, likeOrDislike }) => {
  return (
    <div className="like-post-container">
      <div className="like-post-button-container" onClick={likeOrDislike}>
        <img
          src={post.currentUserLike === true ? liked : notLiked}
          alt="icon"
          className="like-post-liked-icon"
        />

        <label className="like-post-label">Like</label>
      </div>
    </div>
  );
});

export default LikePost;
