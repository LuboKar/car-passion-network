import React, { createContext, useState } from "react";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const addNewPost = (createdPost) => {
    setPosts((prevPosts) => [createdPost, ...prevPosts]);
  };

  const toggleLike = (index, post) => {
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts];

      updatedPosts[index] = post;

      return updatedPosts;
    });
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
    <PostsContext.Provider
      value={{ posts, setPosts, addNewPost, toggleLike, commentPostByIndex }}
    >
      {children}
    </PostsContext.Provider>
  );
};
