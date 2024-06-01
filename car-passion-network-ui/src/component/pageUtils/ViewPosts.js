import React, { useState } from "react";
import "./ViewPosts.css";
import pic from "../../images/profile-pic.jpg";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../Authentication/Authentication";
import open from "../../images/Open.png";
import LikePost from "./LikePost";
import ViewLikes from "./ViewLikes";
import CommentButton from "./CommentButton";
import WriteComment from "./WriteComment";
import ViewComments from "./ViewComments";

export default function ViewPosts({ posts, setPosts }) {
  const navigate = useNavigate();
  const [toggleComments, setToggleComments] = useState(-1);

  const navigateToProfile = (id) => {
    console.log(id);
    if (isAuthenticated()) {
      navigate(`/profile/${id}`);
    } else navigate("/");
  };

  const toggleLike = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].currentUserLike = !updatedPosts[index].currentUserLike;
    setPosts(updatedPosts);
  };

  const toggleCommentsFunction = (index) => {
    if (index === toggleComments) {
      setToggleComments(-1);
    } else setToggleComments(index);
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
          <div className="post-buttons-border"></div>
          <div className="post-buttons">
            <LikePost post={post} index={index} toggleLike={toggleLike} />
            <CommentButton
              toggleCommentsFunction={() => toggleCommentsFunction(index)}
            />
          </div>

          {toggleComments === index && (
            <div className="comments-container">
              <div className="post-buttons-border"></div>
              <WriteComment post={post} setPosts={setPosts} />
              <ViewComments post={post} navigateToProfile={navigateToProfile} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
