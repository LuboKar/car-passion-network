import React from "react";
import useNavigation from "../../service/NavigateService";
import "./PostLikesDropdown.css";
import User from "../user/User";

export default function PostLikesDropdown({ post, clickedLikes }) {
  const { navigateToProfile } = useNavigation();

  return (
    <div className="post-likes-drowdown-container">
      <div className="post-likes-dropdown-menu">
        <label
          className="post-likes-close-menu"
          onClick={() => clickedLikes(0)}
        >
          X
        </label>
      </div>

      <div className="post-likes-likes-dropdown">
        {post.likes.map((user, index) => (
          <div
            key={index}
            className="post-likes-likes-dropdown-user"
            onClick={() => navigateToProfile(user.id)}
          >
            <User user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}
