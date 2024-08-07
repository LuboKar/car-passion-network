import React from "react";
import "./ViewComments.css";
import Comment from "./Comment";

export default function ViewComments({
  post,
  navigateToProfile,
  toggleCommentLike,
  postIndex,
}) {
  return (
    <div>
      {post.comments &&
        post.comments.map((comment, index) => (
          <div key={index}>
            <Comment
              comment={comment}
              index={index}
              navigateToProfile={navigateToProfile}
              toggleCommentLike={toggleCommentLike}
              postIndex={postIndex}
              postId={post.id}
            />
          </div>
        ))}
    </div>
  );
}
