import React from "react";
import CreatePost from "./CreatePost";
import ViewPosts from "./ViewPosts";

export default function Posts({ posts, setPosts, user, currentUser }) {
  return (
    <div className="posts-container">
      {currentUser.id === user.id && <CreatePost setPosts={setPosts} />}
      <ViewPosts posts={posts} setPosts={setPosts} currentUser={currentUser} />
    </div>
  );
}
