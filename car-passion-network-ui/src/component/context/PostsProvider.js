import React, { createContext, useState } from "react";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(0);
  const [editCommentId, setEditCommentId] = useState(0);
  const [clickedMenu, setClickedMenu] = useState(0);
  const [clickedCommentMenu, setClickedCommentMenu] = useState(0);

  const addNewPost = (createdPost) => {
    setPosts((prevPosts) => [createdPost, ...prevPosts]);
  };

  const toggleLike = (post, index) => {
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts];

      updatedPosts[index] = post;

      return updatedPosts;
    });
  };

  const removePost = async (index, id) => {
    setPosts((prevPosts) => [
      ...prevPosts.slice(0, index),
      ...prevPosts.slice(index + 1),
    ]);
  };

  const commentPostByIndex = (createdComment, index) => {
    setPosts((prevPosts) => {
      const newPosts = [...prevPosts];
      const updatedPost = { ...newPosts[index] };

      updatedPost.comments = updatedPost.comments
        ? [...updatedPost.comments, createdComment]
        : [createdComment];

      newPosts[index] = updatedPost;

      return newPosts;
    });
  };

  const editComment = (comment, commentIndex, postIndex) => {
    const updatedPosts = [...posts];
    updatedPosts[postIndex].comments[commentIndex] = comment;
    setPosts(updatedPosts);
  };

  const editPostByIndex = (editedPost, postIndex) => {
    const updatedPosts = [...posts];
    updatedPosts[postIndex] = editedPost;
    setPosts(updatedPosts);
  };

  const toggleMenu = (id) => {
    if (clickedMenu === id) {
      setClickedMenu(0);
    } else setClickedMenu(id);
  };

  const toggleEditPost = (id) => {
    setEditPostId(id);
    setClickedMenu(0);
  };

  const toggleEditComment = (id) => {
    setEditCommentId(id);
    setClickedCommentMenu(0);
  };

  const toggleCommentMenu = (id) => {
    if (clickedCommentMenu === id) {
      setClickedCommentMenu(0);
    } else setClickedCommentMenu(id);
  };

  const removeComment = (commentId, postId) => {
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

    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: removeCommentRecursively(post.comments),
          };
        }
        return post;
      });
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

    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: editCommentRecursively(post.comments),
          };
        }
        return post;
      });
    });
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        addNewPost,
        toggleLike,
        commentPostByIndex,
        editComment,
        removePost,
        editPostId,
        clickedMenu,
        editPostByIndex,
        toggleMenu,
        toggleEditPost,
        setEditPostId,
        clickedCommentMenu,
        toggleCommentMenu,
        removeComment,
        editCommentId,
        toggleEditComment,
        editCommentContent,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
