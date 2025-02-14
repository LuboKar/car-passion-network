import React, { memo } from "react";

const Content = memo(
  ({ post }) => {
    return (
      <div>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.post.title === nextProps.post.title &&
      prevProps.post.content === nextProps.post.content
    );
  }
);

export default Content;
