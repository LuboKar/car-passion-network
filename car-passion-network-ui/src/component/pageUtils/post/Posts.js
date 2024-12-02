import React from "react";
import CreatePost from "./CreatePost";
import ViewPosts from "./ViewPosts";

export default function Posts({ ownerId, groupId }) {
  return (
    <div className="posts-container">
      <CreatePost ownerId={ownerId} groupId={groupId} />
      <ViewPosts />
    </div>
  );
}
