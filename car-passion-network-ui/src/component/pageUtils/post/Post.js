import React, { useState } from "react";
import LikePost from "./LikePost";
import ViewLikes from "./ViewLikes";
import CommentButton from "./CommentButton";
import WriteComment from "./WriteComment";
import ViewComments from "./ViewComments";
import NumberOfComments from "./NumberOfComments";
import PostProfile from "./PostProfile";
import PostContent from "./PostContent";
import "./Post.css";
import PostMenu from "./PostMenu";
import useNavigation from "../../service/NavigateService";
import EditPost from "./EditPost";

export default function Post({
  post,
  index,
  editComment,
  deletePostById,
  editAuthorPost,
  editPostId,
  toggleMenu,
  toggleEditPost,
  clickedMenu,
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
          toggleEditPost={toggleEditPost}
          toggleMenu={toggleMenu}
          clickedMenu={clickedMenu}
        />
      </div>

      {editPostId !== post.id && <PostContent post={post} />}
      {editPostId === post.id && (
        <EditPost post={post} editAuthorPost={editAuthorPost} index={index} />
      )}

      {editPostId !== post.id && (
        <div className="post-tools">
          <div className="post-information">
            <ViewLikes post={post} navigateToProfile={navigateToProfile} />
            <NumberOfComments
              post={post}
              toggleCommentsFunction={() => toggleCommentsFunction(post.id)}
            />
          </div>

          <div className="post-buttons-border"></div>

          <div className="post-buttons">
            <LikePost post={post} index={index} />
            <CommentButton
              toggleCommentsFunction={() => toggleCommentsFunction(post.id)}
            />
          </div>

          {toggleComments === post.id && (
            <div className="comments-container">
              <div className="post-buttons-border"></div>
              <WriteComment post={post} index={index} />
              <ViewComments
                post={post}
                postIndex={index}
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
