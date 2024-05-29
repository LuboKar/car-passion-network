import React, { useState } from "react";
import liked from "../../images/liked.png";
import "./ViewLikes.css";
import pic from "../../images/profile-pic.jpg";

export default function ViewLikes({ post, navigateToProfile }) {
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
        <div className="drowdown-container">
          <div className="dropdown-menu">
            <label className="close-likes" onClick={() => clickedLikes(0)}>
              X
            </label>
          </div>
          <div className="likes-dropdown">
            {post.likes.map((user, index) => (
              <div
                className="liked-user-container"
                onClick={() => navigateToProfile(user.id)}
              >
                <img src={pic} alt="user-pic" className="liked-user-pic" />
                <label key={index} className="liked-user-name">
                  {user.firstName} {user.lastName}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
