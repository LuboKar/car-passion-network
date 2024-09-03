import React, { useContext } from "react";
import CreatePost from "./CreatePost";
import ViewPosts from "./ViewPosts";
import { PostsContext } from "../../context/PostsProvider";

export default function Posts({ ownerId }) {
  const { posts, setPosts } = useContext(PostsContext);
  return (
    <div className="posts-container">
      <CreatePost setPosts={setPosts} ownerId={ownerId} />
      <ViewPosts posts={posts} setPosts={setPosts} />
    </div>
  );
}
