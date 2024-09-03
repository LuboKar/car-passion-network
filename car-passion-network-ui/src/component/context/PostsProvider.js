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

  return (
    <PostsContext.Provider value={{ posts, setPosts, addNewPost, toggleLike }}>
      {children}
    </PostsContext.Provider>
  );
};
