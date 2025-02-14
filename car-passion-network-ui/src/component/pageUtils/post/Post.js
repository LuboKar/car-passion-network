import React, { useState, memo, useMemo, useCallback } from "react";
import PostProfile from "./PostProfile";
import PostContent from "./PostContent";
import "./Post.css";
import PostInformation from "./PostInformation";
import PostButtons from "./PostButtons";
import PostComments from "./PostComments";

const Post = memo(({ post, index, postId }) => {
  const [toggleComments, setToggleComments] = useState(postId ? postId : -1);

  const toggleCommentsFunction = useCallback(() => {
    if (post.id === toggleComments) {
      setToggleComments(-1);
    } else {
      setToggleComments(post.id);
    }
  }, [toggleComments, post.id]);

  return (
    <div className="post-container">
      <PostProfile post={post} index={index} />

      <PostContent post={post} index={index} />

      <PostInformation
        post={post}
        toggleCommentsFunction={toggleCommentsFunction}
      />

      <div className="post-buttons-border"></div>

      <PostButtons
        post={post}
        index={index}
        toggleCommentsFunction={toggleCommentsFunction}
      />

      {toggleComments === post.id && <PostComments post={post} index={index} />}
    </div>
  );
});

export default Post;
