import React from "react";
import Comment from "./Comment";
import "./ViewReplies.css";

export default function ViewReplies({
  comment,
  commentIndex,
  postIndex,
  post,
}) {
  return (
    <div className="view-replies-container">
      {comment.replies &&
        comment.replies.map((reply, index) => (
          <div className="reply-contanier">
            <div className="horizontal-line"></div>

            {index === comment.replies.length - 1 && (
              <div className="fixing-line"></div>
            )}

            <div className="view-replies" key={index}>
              <Comment
                comment={reply}
                commentIndex={commentIndex}
                postIndex={postIndex}
                post={post}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
