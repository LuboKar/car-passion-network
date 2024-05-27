import React from "react";
import { useState } from "react";
import "./CreatePost.css";

export default function CreatePost({ setPosts }) {
  const [createNewPost, setCreateNewPost] = useState(false);

  const [createPostValues, setCreatePostValues] = useState({
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

  const createPost = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch("http://localhost:8080/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(createPostValues),
      });

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
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <div className="post-container">
      <form
        className="post-form"
        onSubmit={createPost}
        onClick={toggleCreatePost}
      >
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
        {createNewPost && (
          <button className="post-button" type="submit">
            Create post
          </button>
        )}
      </form>
    </div>
  );
}
