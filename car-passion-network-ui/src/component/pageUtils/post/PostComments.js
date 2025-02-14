import React, { useContext } from "react";
import "./PostComments.css";
import WriteComment from "./WriteComment";
import ViewComments from "./ViewComments";
import { PostsContext } from "../../context/PostsProvider";

export default function PostComments({ post, index }) {
  const { commentPostByIndex } = useContext(PostsContext);

  return (
    <div className="post-comments-container">
      <div className="post-buttons-border"></div>
      <WriteComment
        post={post}
        index={index}
        commentPostByIndex={commentPostByIndex}
      />

      <ViewComments post={post} postIndex={index} />
    </div>
  );
}
