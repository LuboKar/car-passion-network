import React from "react";
import Comment from "./Comment";

export default function ViewReplies({
  comment,
  commentIndex,
  postIndex,
  postId,
}) {
  return (
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
                postIndex={postIndex}
                postId={postId}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
