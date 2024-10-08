import React, { useState, useContext } from "react";
import "./Comment.css";
import CommentProfile from "./CommentProfile";
import CommentTools from "./CommentTools";
import WriteReply from "./WriteReply";
import ViewReplies from "./ViewReplies";
import CommentMenu from "./CommentMenu";
import EditComment from "./EditComment";
import { PostsContext } from "../../context/PostsProvider";

export default function Comment({
  comment,
  commentIndex,
  postIndex,
  postId,
  postOwnerId,
}) {
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
    <div key={commentIndex} className="view-comment-container">
      {comment.replies && comment.replies.length > 0 && showReplies && (
        <div className="vertical-line"></div>
      )}

      {comment.replies && !showReplies && comment.replies.length > 0 && (
        <div className="show-replies-horizontal-line"></div>
      )}
      <div className="comment-user-container">
        <CommentProfile comment={comment} />
        <CommentMenu
          comment={comment}
          postId={postId}
          postOwnerId={postOwnerId}
        />
      </div>

      {editCommentId !== comment.id && (
        <p className="comment-content">{comment.content}</p>
      )}
      {editCommentId === comment.id && (
        <EditComment
          postId={postId}
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
          postId={postId}
          postIndex={postIndex}
          toggleReply={toggleReply}
          toggleReplies={toggleReplies}
        />
      )}

      {!showReplies && comment.replies && comment.replies.length > 0 && (
        <div className="show-replies-tool">
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
          postId={postId}
        />
      )}
    </div>
  );
}
