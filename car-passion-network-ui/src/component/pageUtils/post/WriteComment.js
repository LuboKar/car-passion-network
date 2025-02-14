import React, { useEffect, memo } from "react";
import send from "../../../images/send.png";
import "./WriteComment.css";
import { useState } from "react";
import cannotSend from "../../../images/cannot-send.png";
import { writeComment } from "../../service/CommentService";
import { getProfilePictureUrl } from "../../service/profilePictureService";
import ProfilePicture from "../user/ProfilePicture";
import defaultProfilePicture from "../../../images/profile-pic.jpg";

const WriteComment = memo(({ post, index, commentPostByIndex }) => {
  const [comment, setComment] = useState({
    postId: post.id,
    content: "",
  });

  const profilePicture = getProfilePictureUrl();

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
      <div className="write-comment-profile-picture-container">
        <ProfilePicture
          profilePicture={profilePicture}
          defaultProfilePicture={defaultProfilePicture}
        />
      </div>

      <input
        className="write-comment-input"
        placeholder="Say something...."
        type="text"
        name="content"
        value={comment.content}
        onChange={handleInputChange}
      />

      {!sendButton && (
        <img
          src={cannotSend}
          alt="pic"
          className="write-comment-cannont-send"
        />
      )}

      {sendButton && (
        <img
          src={send}
          alt="pic"
          className="write-comment-send"
          onClick={commentPost}
        />
      )}
    </div>
  );
});

export default WriteComment;
