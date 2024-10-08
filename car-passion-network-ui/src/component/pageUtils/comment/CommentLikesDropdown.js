import React from "react";
import useNavigation from "../../service/NavigateService";
import pic from "../../../images/profile-pic.jpg";
import "./CommentLikesDropdown.css";

export default function COmmentLikesDropdown({ comment, clickedLikes }) {
  const { navigateToProfile } = useNavigation();
  return (
    <div className="comment-likes-drowdown-container">
      <div className="dropdown-menu">
        <label className="close-likes" onClick={() => clickedLikes(0)}>
          X
        </label>
      </div>
      <div className="comment-likes-dropdown">
        {comment.likes.map((user, index) => (
          <div
            key={index}
            className="comment-likes-container"
            onClick={() => navigateToProfile(user.id)}
          >
            <img src={pic} alt="user-pic" className="user-like-pic" />
            <label key={index} className="user-like-name">
              {user.firstName} {user.lastName}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}