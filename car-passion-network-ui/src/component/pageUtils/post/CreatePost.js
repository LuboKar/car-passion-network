import React, { useState, useEffect, useContext } from "react";
import "./CreatePost.css";
import { createPost } from "../../service/PostService";
import { PostsContext } from "../../context/PostsProvider";

export default function CreatePost({ ownerId, groupId }) {
  const [createNewPost, setCreateNewPost] = useState(false);
  const [createPostButton, setCreatePostButton] = useState(false);

  const [createPostValues, setCreatePostValues] = useState({
    owner: ownerId || null,
    title: "",
    content: "",
    group: groupId || null,
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
      [name]: value,
    }));
  };

  useEffect(() => {
    if (createPostValues.title !== "") {
      setCreatePostButton(false);
    }
  }, [createPostValues.title]);

  const create = async (event) => {
    event.preventDefault();

    if (createPostValues.title !== "") {
      const response = await createPost(createPostValues);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const createdPost = await response.json();

      setCreateNewPost(false);
      addNewPost(createdPost);
      setCreatePostValues({
        title: "",
        content: "",
      });
    } else {
      setCreatePostButton(true);
    }
  };

  console.log(createPostValues);

  return (
    <div className="create-post-container">
      <form
        className="create-post-form"
        onSubmit={create}
        onClick={toggleCreatePost}
      >
        <input
          className={
            !createPostButton
              ? "create-post-title-input"
              : "create-post-empty-title-imput"
          }
          placeholder="Title"
          type="text"
          name="title"
          value={createPostValues.title}
          onChange={handleInputChange}
        />

        {createNewPost && (
          <textarea
            className="create-post-content"
            placeholder="Text..."
            type="text"
            name="content"
            value={createPostValues.content}
            onChange={handleInputChange}
          />
        )}

        {createNewPost && (
          <button className="create-post-button" type="submit">
            Create post
          </button>
        )}
      </form>
    </div>
  );
}
