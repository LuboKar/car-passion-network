import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../Authentication/Authentication";
import LikePost from "./LikePost";
import ViewLikes from "./ViewLikes";
import CommentButton from "./CommentButton";
import WriteComment from "./WriteComment";
import ViewComments from "./ViewComments";
import NumberOfComments from "./NumberOfComments";
import PostProfile from "./PostProfile";
import PostContent from "./PostContent";
import "./ViewPosts.css";

export default function Post({ post, setPosts, index, toggleLike }) {
  const navigate = useNavigate();
  const [toggleComments, setToggleComments] = useState(-1);

  const navigateToProfile = (id) => {
    if (isAuthenticated()) {
      navigate(`/profile/${id}`);
    } else navigate("/");
  };

  const toggleCommentsFunction = (id) => {
    if (id === toggleComments) {
      setToggleComments(-1);
    } else setToggleComments(id);
  };
  return (
    <div className="view-posts-container">
      <PostProfile post={post} navigateToProfile={navigateToProfile} />
      <PostContent post={post} />

      <div className="post-information">
        <ViewLikes post={post} navigateToProfile={navigateToProfile} />
        <NumberOfComments
          post={post}
          toggleCommentsFunction={() => toggleCommentsFunction(post.id)}
        />
      </div>

      <div className="post-buttons-border"></div>

      <div className="post-buttons">
        <LikePost post={post} index={index} toggleLike={toggleLike} />
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
  );
}
