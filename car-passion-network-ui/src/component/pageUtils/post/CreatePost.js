import React, { useState, useEffect, useContext } from "react";
import "./CreatePost.css";
import { createPost } from "../../service/PostService";
import { PostsContext } from "../../context/PostsProvider";

export default function CreatePost({ ownerId }) {
  const [createNewPost, setCreateNewPost] = useState(false);
  const [createPostButton, setCreatePostButton] = useState(false);

  const [createPostValues, setCreatePostValues] = useState({
    ownerId: ownerId,
    title: "",
    content: "",
  });

  const { addNewPost } = useContext(PostsContext);

  const toggleCreatePost = () => {
    setCreateNewPost(true);
  };

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setCreatePostValues((createPostValues) => ({
      ...createPostValues,
      ownerId: ownerId,
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
    addNewPost(createdPost);
    setCreatePostValues({
      ownerId: ownerId,
      title: "",
      content: "",
    });
  };
  return (
    <div className="create-post-container">
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
