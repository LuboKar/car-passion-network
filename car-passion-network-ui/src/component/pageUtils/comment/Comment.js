import React, { useState, useEffect } from "react";
import "./Comment.css";
import { replyComment } from "../../service/CommentService";
import CommentProfile from "./CommentProfile";
import CommentTools from "./CommentTools";
import WriteReply from "./WriteReply";

export default function Comment({
  comment,
  commentIndex,
  navigateToProfile,
  editComment,
  postIndex,
  postId,
}) {
  const [clickedReply, setClickedReply] = useState(0);

  const [reply, setReply] = useState({
    postId: postId,
    content: "",
    parentCommentId: comment.id,
  });

  const [sendButton, setSendButton] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setReply((contentValue) => ({
      ...contentValue,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (reply.content === "") {
      setSendButton(false);
    } else setSendButton(true);
  }, [reply.content]);

  const toggleReply = (id) => {
    if (clickedReply === 0) {
      setClickedReply(id);
    } else setClickedReply(0);
  };

  const commentReply = async (event) => {
    event.preventDefault();
    if (comment.content === "") return;

    const response = await replyComment(reply);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    setReply((prevReply) => ({
      ...prevReply,
      content: "",
    }));

    const repliedComment = await response.json();

    editComment(postIndex, commentIndex, repliedComment);
    toggleReply(0);
    toggleReplies();
  };

  const toggleReplies = () => {
    setShowReplies(true);
  };

  return (
    <div key={commentIndex} className="view-comment-container">
      {showReplies && <div className="vertical-line"></div>}

      {comment.replies && !showReplies && comment.replies.length > 0 && (
        <div className="show-replies-horizontal-line"></div>
      )}

      <CommentProfile comment={comment} navigateToProfile={navigateToProfile} />

      <p className="comment-content">{comment.content}</p>

      <CommentTools
        comment={comment}
        editComment={editComment}
        postIndex={postIndex}
        commentIndex={commentIndex}
        toggleReply={toggleReply}
        clickedReply={clickedReply}
        navigateToProfile={navigateToProfile}
      />

      {clickedReply === comment.id && (
        <WriteReply
          reply={reply}
          handleInputChange={handleInputChange}
          sendButton={sendButton}
          commentReply={commentReply}
        />
      )}

      {!showReplies && comment.replies && comment.replies.length > 0 && (
        <div className="show-replies-tool">
          <label className="show-replies" onClick={toggleReplies}>
            show {comment.replies.length} replies
          </label>
        </div>
      )}

      {showReplies && (
        <div>
          {comment.replies &&
            comment.replies.map((reply, index) => (
              <div>
                <div className="horizontal-line"></div>
                {index === comment.replies.length - 1 && (
                  <div className="fixing-line"></div>
                )}
                <div className="view-replies" key={index}>
                  <Comment
                    comment={reply}
                    commentIndex={commentIndex}
                    navigateToProfile={navigateToProfile}
                    editComment={editComment}
                    postIndex={postIndex}
                    postId={postId}
                  />
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
