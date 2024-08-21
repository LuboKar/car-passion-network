import React from "react";
import Post from "./Post";

export default function ViewPosts({ posts, setPosts, deletePostById }) {
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

  const editComment = (postIndex, commentIndex, comment) => {
    const updatedPosts = [...posts];
    updatedPosts[postIndex].comments[commentIndex] = comment;
    setPosts(updatedPosts);
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
            editComment={editComment}
            deletePostById={deletePostById}
          />
        </div>
      ))}
    </div>
  );
}
