import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PostPage.css";
import Navbar from "../pageUtils/Navbar";
import { getPost } from "../service/PostService";
import PostProfile from "../pageUtils/PostProfile";
import useNavigation from "../service/NavigateService";
import PostContent from "../pageUtils/PostContent";
import ViewLikes from "../pageUtils/ViewLikes";
import NumberOfComments from "../pageUtils/NumberOfComments";
import LikePost from "../pageUtils/LikePost";
import { jwtDecode } from "jwt-decode";
import { getUser } from "../service/UserService";
import CommentButton from "../pageUtils/CommentButton";
import WriteComment from "../pageUtils/WriteComment";
import ViewComments from "../pageUtils/ViewComments";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const { navigateToProfile } = useNavigation();
  const [toggleComments, setToggleComments] = useState(true);

  const fetchPost = async () => {
    const response = await getPost(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const postData = await response.json();
    setPost(postData);
    setLoadingPost(false);
  };

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(token);
    const currentId = decodedToken.userId;

    const response = await getUser(currentId);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const userData = await response.json();
    setCurrentUser(userData);
  };

  useEffect(() => {
    fetchPost();
    fetchCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const toggleCommentsFunction = () => {
    setToggleComments(!toggleComments);
  };

  const toggleLike = () => {
    const userExists = post.likes.some((like) => like.id === currentUser.id);

    const userLikes = userExists
      ? post.likes.filter((like) => like.id !== currentUser.id)
      : [...post.likes, currentUser];

    setPost((prevPost) => ({
      ...prevPost,
      currentUserLike: !prevPost.currentUserLike,
      likes: userLikes,
    }));
  };

  const commentPostByIndex = (index, createdComment) => {
    setPost((prevPost) => ({
      ...prevPost,
      comments: [...prevPost.comments, createdComment],
    }));
  };

  return (
    <div className="post-page-container">
      <Navbar />
      {!loadingPost && (
        <div className="single-post-container">
          <PostProfile post={post} navigateToProfile={navigateToProfile} />
          <PostContent post={post} />

          <div className="post-information">
            <ViewLikes post={post} navigateToProfile={navigateToProfile} />
            <NumberOfComments
              post={post}
              toggleCommentsFunction={toggleCommentsFunction}
            />
          </div>

          <div className="post-buttons-border"></div>

          <div className="post-buttons">
            <LikePost post={post} toggleLike={toggleLike} />
            <CommentButton toggleCommentsFunction={toggleCommentsFunction} />
          </div>

          {toggleComments && (
            <div className="comments-container">
              <div className="post-buttons-border"></div>
              <WriteComment
                post={post}
                commentPostByIndex={commentPostByIndex}
              />
              <ViewComments post={post} navigateToProfile={navigateToProfile} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
