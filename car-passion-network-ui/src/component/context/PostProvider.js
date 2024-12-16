import React, { useContext, useState } from "react";
import { PostsContext } from "./PostsProvider";
import useNavigation from "../service/NavigateService";

export const PostProvider = ({ children }) => {
  const postsContext = useContext(PostsContext);

  const [post, setPost] = useState(null);

  const { navigateToFeedPage } = useNavigation();

  const deletePost = () => {
    navigateToFeedPage();
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
    setPost((prevPost) => {
      const updatedPost = { ...prevPost };

      updatedPost.comments[commentIndex] = comment;

      return updatedPost;
    });
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

  const editCommentContent = (commentId, newComment, postId) => {
    const editCommentRecursively = (comments) => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, ...newComment };
        }
        if (comment.replies) {
          comment.replies = editCommentRecursively(comment.replies);
        }
        return comment;
      });
    };

    setPost((prevPost) => {
      return {
        ...prevPost,
        comments: editCommentRecursively(prevPost.comments),
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
    editCommentContent: editCommentContent,
  };

  return (
    <PostsContext.Provider value={postProviderValues}>
      {children}
    </PostsContext.Provider>
  );
};
