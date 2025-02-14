import React, { memo } from "react";
import "./PostProfile.css";
import PostMenu from "./PostMenu";
import PostProfileInformation from "./PostProfileInformation";

const PostProfile = memo(
  ({ post, index }) => {
    return (
      <div className="post-profile-container">
        <PostProfileInformation post={post} />

        <PostMenu post={post} index={index} />
      </div>
    );
  },

  (prevProps, nextProps) => {
    return prevProps.post.id === nextProps.post.id;
  }
);

export default PostProfile;
