import React, { useState, useContext } from "react";
import "./Comment.css";
import CommentProfile from "./CommentProfile";
import CommentTools from "./CommentTools";
import WriteReply from "./WriteReply";
import ViewReplies from "./ViewReplies";
import CommentMenu from "./CommentMenu";
import EditComment from "./EditComment";
import { PostsContext } from "../../context/PostsProvider";
import CommentContent from "./CommentContent";

export default function Comment({ comment, commentIndex, postIndex, post }) {
  const [clickedReply, setClickedReply] = useState(0);

  const [showReplies, setShowReplies] = useState(false);

  const { editCommentId } = useContext(PostsContext);

  const toggleReply = (id) => {
    if (clickedReply === 0) {
      setClickedReply(id);
    } else setClickedReply(0);
  };

  const toggleReplies = () => {
    setShowReplies(true);
  };

  return (
    <div key={commentIndex} className="comment-container">
      {comment.replies && comment.replies.length > 0 && showReplies && (
        <div className="comment-container-vertical-line"></div>
      )}

      {comment.replies && !showReplies && comment.replies.length > 0 && (
        <div className="comment-container-horizontal-line"></div>
      )}

      <div className="comment-user-container">
        <CommentProfile comment={comment} />

        <CommentMenu comment={comment} post={post} />
      </div>

      {editCommentId !== comment.id ? (
        <CommentContent commentContent={comment.content} />
      ) : (
        <EditComment
          postId={post.id}
          commentId={comment.id}
          content={comment.content}
        />
      )}

      {editCommentId !== comment.id && (
        <CommentTools
          comment={comment}
          postIndex={postIndex}
          commentIndex={commentIndex}
          toggleReply={toggleReply}
          clickedReply={clickedReply}
        />
      )}

      {clickedReply === comment.id && (
        <WriteReply
          comment={comment}
          commentIndex={commentIndex}
          postId={post.id}
          postIndex={postIndex}
          toggleReply={toggleReply}
          toggleReplies={toggleReplies}
        />
      )}

      {!showReplies && comment.replies && comment.replies.length > 0 && (
        <div className="comment-show-replies-container">
          <label className="show-replies" onClick={toggleReplies}>
            show {comment.replies.length} replies
          </label>
        </div>
      )}

      {showReplies && (
        <ViewReplies
          comment={comment}
          commentIndex={commentIndex}
          postIndex={postIndex}
          post={post}
        />
      )}
    </div>
  );
}
