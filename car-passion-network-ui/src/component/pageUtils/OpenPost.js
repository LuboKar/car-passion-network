import React from "react";
import open from "../../images/Open.png";
import "./OpenPost.css";

export default function OpenPost({ post, navigateToPostPage }) {
  return (
    <div className="open-post-container">
      <img
        src={open}
        alt="open-pic"
        className="open-pic"
        onClick={() => navigateToPostPage(post.id)}
      />
    </div>
  );
}
