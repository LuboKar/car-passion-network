import React from "react";
import CreatePost from "./CreatePost";
import ViewPosts from "./ViewPosts";
import { deletePost } from "../../service/PostService";

export default function Posts({ posts, setPosts, ownerId }) {
  const deletePostById = async (index, id) => {
    setPosts((prevPosts) => [
      ...prevPosts.slice(0, index),
      ...prevPosts.slice(index + 1),
    ]);

    const response = await deletePost(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  };

  return (
    <div className="posts-container">
      <CreatePost setPosts={setPosts} ownerId={ownerId} />
      <ViewPosts
        posts={posts}
        setPosts={setPosts}
        deletePostById={deletePostById}
      />
    </div>
  );
}
