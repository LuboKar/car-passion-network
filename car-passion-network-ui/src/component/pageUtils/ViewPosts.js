import React from "react";
import "./ViewPosts.css";
import pic from "../../images/profile-pic.jpg";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../Authentication/Authentication";
import open from "../../images/Open.png";
import LikePost from "./LikePost";
import ViewLikes from "./ViewLikes";

export default function ViewPosts({ posts, setPosts }) {
  const navigate = useNavigate();

  const navigateToProfile = (id) => {
    if (isAuthenticated()) {
      navigate(`/profile/${id}`);
    } else navigate("/");
  };

  const toggleLike = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].currentUserLike = !updatedPosts[index].currentUserLike;
    setPosts(updatedPosts);
  };
  return (
    <div>
      {posts.map((post, index) => (
        <div key={index} className="view-posts-container">
          <div className="post-profile">
            <img
              src={pic}
              alt="profile-pic"
              className="post-profile-pic"
              onClick={() => navigateToProfile(post.user.id)}
            />
            <div className="post-profile-information">
              <h1
                className="post-user-name"
                onClick={() => navigateToProfile(post.user.id)}
              >
                {post.user.firstName} {post.user.lastName}
              </h1>
              <label className="post-date">{post.createdAt}</label>
            </div>
            <img src={open} alt="open-pic" className="open-pic" />
          </div>
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
          <ViewLikes post={post} navigateToProfile={navigateToProfile} />
          <LikePost post={post} index={index} toggleLike={toggleLike} />
        </div>
      ))}
    </div>
  );
}
