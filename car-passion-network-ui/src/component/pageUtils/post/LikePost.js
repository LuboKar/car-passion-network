import React, { useContext } from "react";
import "./LikePost.css";
import liked from "../../../images/liked.png";
import notLiked from "../../../images/not liked.png";
import { likePost } from "../../service/PostService";
import { PostsContext } from "../../context/PostsProvider";

export default function LikePost({ post, index }) {
  const { toggleLike } = useContext(PostsContext);

  const likeOrDislike = async (event) => {
    event.preventDefault();

    const response = await likePost(post);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const likedPost = await response.json();

    toggleLike(likedPost, index);
  };

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
}
