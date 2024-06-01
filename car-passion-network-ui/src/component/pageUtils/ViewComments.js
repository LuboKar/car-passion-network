import React from "react";
import pic from "../../images/profile-pic.jpg";
import "./ViewComments.css";

export default function ViewComments({ post, navigateToProfile }) {
  return (
    <div>
      {post.comments &&
        post.comments.map((comment, index) => (
          <div key={index} className="view-comment-container">
            <div className="comment-profile">
              <img
                src={pic}
                alt="profile-pic"
                className="comment-profile-pic"
                onClick={() => navigateToProfile(comment.user.id)}
              />
              <label
                className="comment-profile-name"
                onClick={() => navigateToProfile(comment.user.id)}
              >
                {comment.user.firstName} {comment.user.lastName}
              </label>

              <label className="comment-date">{comment.createdAt}</label>
            </div>
            <p className="comment-content">{comment.content}</p>
          </div>
        ))}
    </div>
  );
}
