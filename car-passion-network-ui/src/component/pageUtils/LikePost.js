import React from "react";
import "./LikePost.css";
import liked from "../../images/liked.png";
import notLiked from "../../images/not liked.png";

export default function LikePost({ post, index, toggleLike }) {
  const likeOrDislike = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(
        "http://localhost:8080/post/like/" + post.id,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      toggleLike(index);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <div className="like-post-container">
      <div className="like-post-top-border"></div>
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
