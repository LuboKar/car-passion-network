import React, { useState, useContext } from "react";
import "./EditPost.css";
import { editPost } from "../../service/PostService";
import { PostsContext } from "../../context/PostsProvider";

export default function EditPost({ post, index }) {
  const [editPostValues, setEditPostValues] = useState({
    postId: post.id,
    title: post.title,
    content: post.content,
  });

  const { editPostByIndex, setEditPostId } = useContext(PostsContext);

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setEditPostValues((editPostValues) => ({
      ...editPostValues,
      [name]: value,
    }));
  };

  const editAuthorPost = async (event, editPostValues, postIndex) => {
    event.preventDefault();

    const response = await editPost(editPostValues);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const editedPost = await response.json();

    editPostByIndex(editedPost, postIndex);

    setEditPostId(0);
  };

  return (
    <div className="edit-post-container">
      <form
        className="edit-post-form"
        onSubmit={(event) => editAuthorPost(event, editPostValues, index)}
      >
        <input
          className="edit-post-title-input"
          placeholder="Title"
          type="text"
          name="title"
          value={editPostValues.title}
          onChange={handleInputChange}
        />
        <textarea
          className="edit-post-content-input"
          placeholder="Text..."
          type="text"
          name="content"
          value={editPostValues.content}
          onChange={handleInputChange}
        />
        <button className="edit-post-button" type="submit">
          Save changes
        </button>
      </form>
    </div>
  );
}
