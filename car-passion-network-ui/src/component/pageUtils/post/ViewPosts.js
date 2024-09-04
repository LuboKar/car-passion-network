import React, { useState } from "react";
import Post from "./Post";
import { editPost } from "../../service/PostService";
import { deletePost } from "../../service/PostService";

export default function ViewPosts({ posts, setPosts }) {
  const [editPostId, setEditPostId] = useState(0);
  const [clickedMenu, setClickedMenu] = useState(0);

  const editAuthorPost = async (event, editPostValues, postIndex) => {
    event.preventDefault();

    const response = await editPost(editPostValues);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const editedPost = await response.json();

    const updatedPosts = [...posts];
    updatedPosts[postIndex] = editedPost;
    setPosts(updatedPosts);

    setEditPostId(0);
  };

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

  const toggleMenu = (id) => {
    if (clickedMenu === id) {
      setClickedMenu(0);
    } else setClickedMenu(id);
  };

  const toggleEditPost = (id) => {
    setEditPostId(id);
    setClickedMenu(0);
  };

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <Post
            post={post}
            index={index}
            deletePostById={deletePostById}
            editAuthorPost={editAuthorPost}
            editPostId={editPostId}
            toggleMenu={toggleMenu}
            toggleEditPost={toggleEditPost}
            clickedMenu={clickedMenu}
          />
        </div>
      ))}
    </div>
  );
}
