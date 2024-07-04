import React from "react";
import CreatePost from "./CreatePost";
import ViewPosts from "./ViewPosts";

export default function Posts({ posts, setPosts, user, currentUser }) {
  return (
    <div className="posts-container">
      <CreatePost setPosts={setPosts} ownerId={user.id} />
      <ViewPosts posts={posts} setPosts={setPosts} currentUser={currentUser} />
    </div>
  );
}
