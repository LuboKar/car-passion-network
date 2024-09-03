import React, { createContext, useState } from "react";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const addNewPost = (createdPost) => {
    setPosts((prevPosts) => [createdPost, ...prevPosts]);
  };

  return (
    <PostsContext.Provider value={{ posts, setPosts, addNewPost }}>
      {children}
    </PostsContext.Provider>
  );
};
