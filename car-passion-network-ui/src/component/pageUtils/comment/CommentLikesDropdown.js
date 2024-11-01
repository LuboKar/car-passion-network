import React from "react";
import "./CommentLikesDropdown.css";
import User from "../user/User";
import useNavigation from "../../service/NavigateService";

export default function CommentLikesDropdown({ comment, clickedLikes }) {
  const { navigateToProfile } = useNavigation();

  return (
    <div className="comment-likes-drowdown-container">
      <div className="comment-likes-dropdown-menu">
        <label
          className="comment-likes-close-menu"
          onClick={() => clickedLikes(0)}
        >
          X
        </label>
      </div>

      <div className="comment-likes-dropdown">
        {comment.likes.map((user, index) => (
          <User
            user={user}
            index={index}
            navigateToProfile={() => navigateToProfile(user.id)}
          />
        ))}
      </div>
    </div>
  );
}
