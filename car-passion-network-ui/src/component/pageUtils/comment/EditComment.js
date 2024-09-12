import React, { useState, useEffect, useContext } from "react";
import send from "../../../images/send.png";
import cannotSend from "../../../images/cannot-send.png";
import "./EditComment.css";
import { editComment } from "../../service/CommentService";
import { PostsContext } from "../../context/PostsProvider";

export default function EditComment({ postId, commentId, content }) {
  const [editCommentValues, setEditCommentValues] = useState({
    postId: postId,
    commentId: commentId,
    content: content,
  });

  const [sendButton, setSendButton] = useState(false);

  const { toggleEditComment, editCommentContent } = useContext(PostsContext);

  useEffect(() => {
    if (editCommentValues.content === "") {
      setSendButton(false);
    } else setSendButton(true);
  }, [editCommentValues.content]);

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setEditCommentValues((prevEditCommentValues) => ({
      ...prevEditCommentValues,
      [name]: value,
    }));
  };

  const commentEdit = async () => {
    const response = await editComment(editCommentValues);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const editedComment = await response.json();

    editCommentContent(commentId, editedComment, postId);

    toggleEditComment(0);
  };

  return (
    <div className="edit-comment-container">
      <input
        className="edit-comment-input"
        placeholder="Say something..."
        type="text"
        name="content"
        value={editCommentValues.content}
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
          onClick={commentEdit}
        />
      )}
    </div>
  );
}
