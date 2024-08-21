import React, { useState } from "react";
import LikePost from "./LikePost";
import ViewLikes from "./ViewLikes";
import CommentButton from "./CommentButton";
import WriteComment from "./WriteComment";
import ViewComments from "./ViewComments";
import NumberOfComments from "./NumberOfComments";
import PostProfile from "./PostProfile";
import PostContent from "./PostContent";
import "./ViewPosts.css";
import PostMenu from "./PostMenu";
import useNavigation from "../../service/NavigateService";

export default function Post({
  post,
  index,
  toggleLike,
  commentPostByIndex,
  editComment,
  deletePostById,
}) {
  const [toggleComments, setToggleComments] = useState(-1);
  const { navigateToProfile, navigateToPostPage } = useNavigation();

  const toggleCommentsFunction = (id) => {
    if (id === toggleComments) {
      setToggleComments(-1);
    } else setToggleComments(id);
  };

  return (
    <div className="view-posts-container">
      <div className="post-user-container">
        <PostProfile post={post} navigateToProfile={navigateToProfile} />
        <PostMenu
          post={post}
          navigateToPostPage={navigateToPostPage}
          index={index}
          deletePostById={deletePostById}
        />
      </div>

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
          <WriteComment
            post={post}
            index={index}
            commentPostByIndex={commentPostByIndex}
          />
          <ViewComments
            post={post}
            postIndex={index}
            navigateToProfile={navigateToProfile}
            editComment={editComment}
          />
        </div>
      )}
    </div>
  );
}
