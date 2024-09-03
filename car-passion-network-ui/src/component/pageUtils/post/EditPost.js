import React, { useState } from "react";
import "./EditPost.css";

export default function EditPost({ post, editAuthorPost, index }) {
  const [editPostValues, setEditPostValues] = useState({
    postId: post.id,
    title: post.title,
    content: post.content,
  });

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setEditPostValues((editPostValues) => ({
      ...editPostValues,
      [name]: value,
    }));
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