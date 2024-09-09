import React, { useState, useContext, useEffect } from "react";
import pic from "../../../images/profile-pic.jpg";
import send from "../../../images/send.png";
import cannotSend from "../../../images/cannot-send.png";
import "./WriteReply.css";
import { replyComment } from "../../service/CommentService";
import { PostsContext } from "../../context/PostsProvider";

export default function WriteReply({
  comment,
  commentIndex,
  postIndex,
  postId,
  toggleReply,
  toggleReplies,
}) {
  const [reply, setReply] = useState({
    postId: postId,
    content: "",
    parentCommentId: comment.id,
  });

  const [sendButton, setSendButton] = useState(false);

  const { editComment } = useContext(PostsContext);

  useEffect(() => {
    if (reply.content === "") {
      setSendButton(false);
    } else setSendButton(true);
  }, [reply.content]);

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setReply((contentValue) => ({
      ...contentValue,
      [name]: value,
    }));
  };

  const commentReply = async (event) => {
    event.preventDefault();

    const response = await replyComment(reply);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    setReply((prevReply) => ({
      ...prevReply,
      content: "",
    }));

    const repliedComment = await response.json();

    editComment(repliedComment, commentIndex, postIndex);
    toggleReply(0);
    toggleReplies();
  };

  return (
    <div className="reply-comment-input">
      <img src={pic} alt="pic" className="write-comment-profile-pic" />
      <input
        className="comment-input"
        placeholder="Reply...."
        type="text"
        name="content"
        value={reply.content}
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
          onClick={commentReply}
        />
      )}
    </div>
  );
}
