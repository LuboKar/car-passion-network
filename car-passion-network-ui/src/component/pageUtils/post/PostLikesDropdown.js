import React from "react";
import useNavigation from "../../service/NavigateService";
import pic from "../../../images/profile-pic.jpg";
import "./PostLikesDropdown.css";

export default function PostLikesDropdown({ post, clickedLikes }) {
  const { navigateToProfile } = useNavigation();
  return (
    <div className="drowdown-container">
      <div className="dropdown-menu">
        <label className="close-likes" onClick={() => clickedLikes(0)}>
          X
        </label>
      </div>
      <div className="likes-dropdown">
        {post.likes.map((user, index) => (
          <div
            key={index}
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
  );
}
