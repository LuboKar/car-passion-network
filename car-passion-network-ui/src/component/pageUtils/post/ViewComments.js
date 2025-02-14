import React, { memo } from "react";
import "./ViewComments.css";
import Comment from "../comment/Comment";

const ViewComments = memo(({ post, postIndex }) => {
  return (
    <div>
      {post.comments &&
        post.comments.map((comment, index) => (
          <div key={index} className="view-comments-container">
            <Comment
              comment={comment}
              commentIndex={index}
              postIndex={postIndex}
              post={post}
            />
          </div>
        ))}
    </div>
  );
});

export default ViewComments;
