import React from "react";
import CreatePost from "./CreatePost";
import ViewPosts from "./ViewPosts";

export default function Posts({ posts, setPosts, ownerId, currentUser }) {
  return (
    <div className="posts-container">
      <CreatePost setPosts={setPosts} ownerId={ownerId} />
      <ViewPosts posts={posts} setPosts={setPosts} currentUser={currentUser} />
    </div>
  );
}
