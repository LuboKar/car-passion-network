import React, { useContext, useCallback } from "react";
import "./PostButtons.css";
import LikePost from "./LikePost";
import CommentButton from "./CommentButton";
import { PostsContext } from "../../context/PostsProvider";
import { likePost } from "../../service/PostService";

export default function PostButtons({ post, index, toggleCommentsFunction }) {
  const { toggleLike } = useContext(PostsContext);

  const likeOrDislike = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        const response = await likePost(post);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const likedPost = await response.json();

        toggleLike(likedPost, index);
      } catch (error) {
        console.error("Error liking post:", error);
      }
    },
    [post, index, toggleLike]
  );

  return (
    <div className="post-buttons">
      <LikePost post={post} likeOrDislike={likeOrDislike} />

      <CommentButton toggleCommentsFunction={toggleCommentsFunction} />
    </div>
  );
}
