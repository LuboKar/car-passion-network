import React from "react";
import "./ViewComments.css";
import Comment from "../comment/Comment";

export default function ViewComments({ post, navigateToProfile, postIndex }) {
  return (
    <div>
      {post.comments &&
        post.comments.map((comment, index) => (
          <div key={index} className="comments-container">
            <Comment
              comment={comment}
              commentIndex={index}
              navigateToProfile={navigateToProfile}
              postIndex={postIndex}
              postId={post.id}
            />
          </div>
        ))}
    </div>
  );
}
