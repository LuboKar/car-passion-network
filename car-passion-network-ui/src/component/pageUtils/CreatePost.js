import React, { useState, useEffect } from "react";
import "./CreatePost.css";
import { createPost } from "../service/PostService";

export default function CreatePost({ setPosts, ownerId }) {
  const [createNewPost, setCreateNewPost] = useState(false);
  const [createPostButton, setCreatePostButton] = useState(false);

  const [createPostValues, setCreatePostValues] = useState({
    ownerId: ownerId,
    title: "",
    content: "",
  });

  const toggleCreatePost = () => {
    setCreateNewPost(true);
  };

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setCreatePostValues((createPostValues) => ({
      ...createPostValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (createPostValues.title === "") {
      setCreatePostButton(false);
    } else setCreatePostButton(true);
  }, [createPostValues.title]);

  const create = async (event) => {
    event.preventDefault();

    const response = await createPost(createPostValues);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const createdPost = await response.json();
    setCreateNewPost(false);
    setPosts((prevPosts) => [createdPost, ...prevPosts]);
    setCreatePostValues({
      title: "",
      content: "",
    });
  };

  return (
    <div className="post-container">
      <form className="post-form" onSubmit={create} onClick={toggleCreatePost}>
        <input
          className="post-title-input"
          placeholder="Title"
          type="text"
          name="title"
          value={createPostValues.title}
          onChange={handleInputChange}
        />
        {createNewPost && (
          <textarea
            className="post-content"
            placeholder="Text..."
            type="text"
            name="content"
            value={createPostValues.content}
            onChange={handleInputChange}
          />
        )}
        {createNewPost && createPostButton && (
          <button className="post-button" type="submit">
            Create post
          </button>
        )}
      </form>
    </div>
  );
}
