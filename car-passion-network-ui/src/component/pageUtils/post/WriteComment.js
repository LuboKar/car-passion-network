import React, { useEffect, useContext } from "react";
import pic from "../../../images/profile-pic.jpg";
import send from "../../../images/send.png";
import "./WriteComment.css";
import { useState } from "react";
import cannotSend from "../../../images/cannot-send.png";
import { writeComment } from "../../service/CommentService";
import { PostsContext } from "../../context/PostsProvider";
import { getProfilePictureUrl } from "../../service/profilePictureService";

export default function WriteComment({ post, index }) {
  const [comment, setComment] = useState({
    postId: post.id,
    content: "",
  });

  const profilePicture = getProfilePictureUrl();

  const [sendButton, setSendButton] = useState(false);

  const { commentPostByIndex } = useContext(PostsContext);

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

  const commentPost = async (event) => {
    event.preventDefault();
    if (comment.content === "") return;

    const response = await writeComment(comment);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    setComment((prevComment) => ({
      ...prevComment,
      content: "",
    }));

    const createdComment = await response.json();

    commentPostByIndex(createdComment, index);
  };

  return (
    <div className="write-comment-container">
      <div className="write-comment-profile-pic-container">
        <img
          src={profilePicture ? `http://localhost:8080/${profilePicture}` : pic}
          alt={"profile-pic"}
          className="write-comment-profile-pic"
        />
      </div>

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
          onClick={commentPost}
        />
      )}
    </div>
  );
}
