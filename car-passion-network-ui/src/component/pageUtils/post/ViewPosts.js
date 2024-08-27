import React, { useState } from "react";
import Post from "./Post";
import { editPost } from "../../service/PostService";

export default function ViewPosts({ posts, setPosts, deletePostById }) {
  const [editPostId, setEditPostId] = useState(0);
  const [clickedMenu, setClickedMenu] = useState(0);

  const toggleLike = (index, post) => {
    const updatedPosts = [...posts];

    updatedPosts[index] = post;

    setPosts(updatedPosts);
  };

  const commentPostByIndex = (index, createdComment) => {
    setPosts((prevPosts) => {
      const newPosts = [...prevPosts];
      const updatedPost = { ...newPosts[index] };

      updatedPost.comments = updatedPost.comments
        ? [...updatedPost.comments, createdComment]
        : [createdComment];

      newPosts[index] = updatedPost;

      return newPosts;
    });
  };

  const editComment = (postIndex, commentIndex, comment) => {
    const updatedPosts = [...posts];
    updatedPosts[postIndex].comments[commentIndex] = comment;
    setPosts(updatedPosts);
  };

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
            toggleLike={toggleLike}
            commentPostByIndex={commentPostByIndex}
            editComment={editComment}
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
