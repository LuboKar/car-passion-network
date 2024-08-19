import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PostPage.css";
import Navbar from "../pageUtils/navbar/Navbar";
import { getPost } from "../service/PostService";
import PostProfile from "../pageUtils/post/PostProfile";
import useNavigation from "../service/NavigateService";
import PostContent from "../pageUtils/post/PostContent";
import ViewLikes from "../pageUtils/post/ViewLikes";
import NumberOfComments from "../pageUtils/post/NumberOfComments";
import LikePost from "../pageUtils/post/LikePost";
import CommentButton from "../pageUtils/post/CommentButton";
import WriteComment from "../pageUtils/post/WriteComment";
import ViewComments from "../pageUtils/post/ViewComments";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
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

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const toggleCommentsFunction = () => {
    setToggleComments(!toggleComments);
  };

  const toggleLike = (index, post) => {
    setPost(post);
  };

  const commentPostByIndex = (index, createdComment) => {
    setPost((prevPost) => ({
      ...prevPost,
      comments: [...prevPost.comments, createdComment],
    }));
  };

  const editComment = (postIndex, commentIndex, comment) => {
    setPost((prevPost) => {
      const updatedComments = [...prevPost.comments];
      updatedComments[commentIndex] = comment;

      const updatedPost = { ...prevPost, comments: updatedComments };

      return updatedPost;
    });
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
              <ViewComments
                post={post}
                navigateToProfile={navigateToProfile}
                editComment={editComment}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
