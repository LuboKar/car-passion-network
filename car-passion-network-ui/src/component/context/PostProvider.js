import React, { useContext, useState } from "react";
import { PostsContext } from "./PostsProvider";
import useNavigation from "../service/NavigateService";

export const PostProvider = ({ children }) => {
  const postsContext = useContext(PostsContext);

  const [post, setPost] = useState(null);

  const { navigateToDashboardPage } = useNavigation();

  const deletePost = () => {
    navigateToDashboardPage();
  };

  const editPost = (editedPost) => {
    setPost(editedPost);
  };

  const commentPost = (createdComment) => {
    setPost((prevPost) => {
      const updatedPost = { ...prevPost };

      updatedPost.comments = updatedPost.comments
        ? [...updatedPost.comments, createdComment]
        : [createdComment];

      return updatedPost;
    });
  };

  const editComment = (comment, commentIndex) => {
    const updatedPost = { ...post };
    updatedPost.comments[commentIndex] = comment;
    setPost(updatedPost);
  };

  const removeComment = (commentId) => {
    const removeCommentRecursively = (comments) => {
      return comments.filter((comment) => {
        if (comment.id === commentId) {
          return false;
        }
        if (comment.replies) {
          comment.replies = removeCommentRecursively(comment.replies);
        }
        return true;
      });
    };

    setPost((prevPost) => {
      return {
        ...prevPost,
        comments: removeCommentRecursively(prevPost.comments),
      };
    });
  };

  const postProviderValues = {
    ...postsContext,
    removePost: deletePost,
    post,
    setPost,
    editPostByIndex: editPost,
    toggleLike: editPost,
    commentPostByIndex: commentPost,
    editComment: editComment,
    removeComment: removeComment,
  };

  return (
    <PostsContext.Provider value={postProviderValues}>
      {children}
    </PostsContext.Provider>
  );
};
