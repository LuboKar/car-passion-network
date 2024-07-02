import React from "react";
import Post from "./Post";

export default function ViewPosts({ posts, setPosts, currentUser }) {
  const toggleLike = (index, post) => {
    const updatedPosts = [...posts];

    updatedPosts[index] = post;

    setPosts(updatedPosts);
  };

  const commentPostByIndex = (index, createdComment) => {
    setPosts((prevPosts) => {
      const newPosts = [...prevPosts];
      const updatedPost = { ...newPosts[index] };

      updatedPost.comments = updatedPost.comments
        ? [...updatedPost.comments, createdComment]
        : [createdComment];

      newPosts[index] = updatedPost;

      return newPosts;
    });
  };

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <Post
            post={post}
            index={index}
            toggleLike={toggleLike}
            commentPostByIndex={commentPostByIndex}
          />
        </div>
      ))}
    </div>
  );
}
