import React, { useState } from "react";
import "./CommentTools.css";
import LikeComment from "./LikeComment";
import ReplyComment from "./ReplyComment";
import ViewCommentLikes from "./ViewCommentLikes";
import CommentLikesDropdown from "./CommentLikesDropdown";

export default function CommentTool({
  comment,
  postIndex,
  commentIndex,
  toggleReply,
  clickedReply,
}) {
  const [clickdLikedCommentId, setClickdLikedCommentId] = useState(0);

  const clickedLikes = (id) => {
    if (clickdLikedCommentId === 0) {
      setClickdLikedCommentId(id);
    } else setClickdLikedCommentId(0);
  };

  return (
    <div className="comment-tools-container">
      <div className="comment-tools">
        <LikeComment
          comment={comment}
          postIndex={postIndex}
          commentIndex={commentIndex}
        />

        {comment.depth < 5 && (
          <ReplyComment
            comment={comment}
            toggleReply={toggleReply}
            clickedReply={clickedReply}
          />
        )}

        {comment.likes.length > 0 && (
          <ViewCommentLikes comment={comment} clickedLikes={clickedLikes} />
        )}
      </div>

      {clickdLikedCommentId === comment.id && (
        <CommentLikesDropdown comment={comment} clickedLikes={clickedLikes} />
      )}
    </div>
  );
}
