import React, { useEffect } from "react";
import pic from "../../images/profile-pic.jpg";
import send from "../../images/send.png";
import "./WriteComment.css";
import { useState } from "react";
import cannotSend from "../../images/cannot-send.png";

export default function WriteComment({ post, setPosts }) {
  const [comment, setComment] = useState({
    postId: post.id,
    content: "",
  });

  const [sendButton, setSendButton] = useState(false);

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setComment((contentValue) => ({
      ...contentValue,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (comment.content === "") {
      setSendButton(false);
    } else setSendButton(true);
  }, [comment.content]);

  const writeComment = async (event) => {
    event.preventDefault();
    if (comment.content === "") return;
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch("http://localhost:8080/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(comment),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const createdComment = await response.json();

      setComment((prevComment) => ({
        ...prevComment,
        content: "",
      }));

      const currentPost = post;

      currentPost.comments =
        currentPost.comments === null ? [] : currentPost.comments;
      currentPost.comments = [...currentPost.comments, createdComment];

      setPosts((prevPosts) => {
        return prevPosts.map((p) =>
          p.id === currentPost.id ? currentPost : p
        );
      });
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <div className="write-comment-container">
      <img src={pic} alt="pic" className="write-comment-profile-pic" />
      <input
        className="comment-input"
        placeholder="Say something...."
        type="text"
        name="content"
        value={comment.content}
        onChange={handleInputChange}
      />
      {!sendButton && (
        <img src={cannotSend} alt="pic" className="cannont-send-comment" />
      )}
      {sendButton && (
        <img
          src={send}
          alt="pic"
          className="send-comment"
          onClick={writeComment}
        />
      )}
    </div>
  );
}
