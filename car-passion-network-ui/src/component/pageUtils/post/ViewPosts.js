import React, { useContext } from "react";
import Post from "./Post";
import { PostsContext } from "../../context/PostsProvider";
import "./ViewPosts.css";

export default function ViewPosts() {
  const { posts } = useContext(PostsContext);

  return (
    <div className="view-posts-container">
      {posts.map((post, index) => (
        <div key={index}>
          <Post post={post} index={index} />
        </div>
      ))}
    </div>
  );
}
