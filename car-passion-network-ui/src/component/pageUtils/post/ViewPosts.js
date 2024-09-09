import React, { useContext } from "react";
import Post from "./Post";
import { PostsContext } from "../../context/PostsProvider";
import "./ViewPosts.css";

export default function ViewPosts() {
  const { posts } = useContext(PostsContext);

  return (
    <div>
      {posts.map((post, index) => (
        <div className="view-posts-container" key={index}>
          <Post post={post} index={index} />
        </div>
      ))}
    </div>
  );
}
