import React from "react";
import CreatePost from "./CreatePost";
import ViewPosts from "./ViewPosts";

export default function Posts({ ownerId }) {
  return (
    <div className="posts-container">
      <CreatePost ownerId={ownerId} />
      <ViewPosts />
    </div>
  );
}
