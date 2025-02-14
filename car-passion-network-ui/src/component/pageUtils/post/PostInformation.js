import React from "react";
import "./PostInformation.css";
import ViewLikes from "./ViewLikes";
import NumberOfComments from "./NumberOfComments";

export default function PostInformation({ post, toggleCommentsFunction }) {
  return (
    <div className="post-information">
      <ViewLikes post={post} />

      <NumberOfComments
        post={post}
        toggleCommentsFunction={toggleCommentsFunction}
      />
    </div>
  );
}
