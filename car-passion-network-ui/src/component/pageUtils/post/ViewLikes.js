import React, { useState, memo } from "react";
import liked from "../../../images/liked.png";
import "./ViewLikes.css";
import PostLikesDropdown from "./PostLikesDropdown";

export default function ViewLikes({ post }) {
  const [clickdPostId, setClickedPostId] = useState(0);

  const clickedLikes = (id) => {
    if (clickdPostId === 0) {
      setClickedPostId(id);
    } else setClickedPostId(0);
  };

  return (
    <div>
      {post.likes !== null && post.likes.length > 0 && (
        <div
          className="view-likes-container"
          onClick={() => clickedLikes(post.id)}
        >
          <img src={liked} alt="likes" className="likes-icon" />
          <label className="number-of-likes">{post.likes.length}</label>
        </div>
      )}

      {clickdPostId === post.id && (
        <PostLikesDropdown post={post} clickedLikes={clickedLikes} />
      )}
    </div>
  );
}
