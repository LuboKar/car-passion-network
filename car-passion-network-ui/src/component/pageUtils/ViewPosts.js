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
import NumberOfComments from "./NumberOfComments";
import { jwtDecode } from "jwt-decode";

export default function ViewPosts({ posts, setPosts, user }) {
  const navigate = useNavigate();
  const [toggleComments, setToggleComments] = useState(-1);

  const navigateToProfile = (id) => {
    console.log(id);
    if (isAuthenticated()) {
      navigate(`/profile/${id}`);
    } else navigate("/");
  };

  const toggleLike = (index) => {
    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(token);
    const currentId = decodedToken.userId;

    const updatedPosts = [...posts];
    updatedPosts[index].currentUserLike = !updatedPosts[index].currentUserLike;

    const userExists = updatedPosts[index].likes.some(
      (like) => like.id === currentId
    );
    if (userExists) {
      updatedPosts[index].likes = updatedPosts[index].likes.filter(
        (like) => like.id !== currentId
      );
    } else {
      user.id = currentId;
      updatedPosts[index].likes = [...updatedPosts[index].likes, user];
    }

    console.log(updatedPosts[index].likes);
    setPosts(updatedPosts);
  };

  const toggleCommentsFunction = (id) => {
    console.log(id);
    if (id === toggleComments) {
      setToggleComments(-1);
    } else setToggleComments(id);
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
          <div>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
          <div className="post-information">
            <ViewLikes post={post} navigateToProfile={navigateToProfile} />
            <NumberOfComments
              post={post}
              toggleCommentsFunction={() => toggleCommentsFunction(post.id)}
            />
          </div>
          <div className="post-buttons-border"></div>
          <div className="post-buttons">
            <LikePost
              post={post}
              setPosts={setPosts}
              index={index}
              toggleLike={toggleLike}
            />
            <CommentButton
              toggleCommentsFunction={() => toggleCommentsFunction(post.id)}
            />
          </div>

          {toggleComments === post.id && (
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
