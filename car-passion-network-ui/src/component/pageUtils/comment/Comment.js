import React, { useState } from "react";
import "./Comment.css";
import CommentProfile from "./CommentProfile";
import CommentTools from "./CommentTools";
import WriteReply from "./WriteReply";
import ViewReplies from "./ViewReplies";

export default function Comment({ comment, commentIndex, postIndex, postId }) {
  const [clickedReply, setClickedReply] = useState(0);

  const [showReplies, setShowReplies] = useState(false);

  const toggleReply = (id) => {
    if (clickedReply === 0) {
      setClickedReply(id);
    } else setClickedReply(0);
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

      <CommentProfile comment={comment} />

      <p className="comment-content">{comment.content}</p>

      <CommentTools
        comment={comment}
        postIndex={postIndex}
        commentIndex={commentIndex}
        toggleReply={toggleReply}
        clickedReply={clickedReply}
      />

      {clickedReply === comment.id && (
        <WriteReply
          comment={comment}
          commentIndex={commentIndex}
          postId={postId}
          postIndex={postIndex}
          toggleReply={toggleReply}
          toggleReplies={toggleReplies}
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
        <ViewReplies
          comment={comment}
          commentIndex={commentIndex}
          postIndex={postIndex}
          postId={postId}
        />
      )}
    </div>
  );
}
