import React, { useContext } from "react";
import "./CommentMenu.css";
import menu from "../../../images/menu.png";
import { PostsContext } from "../../context/PostsProvider";
import { getId } from "../../service/TokenService";
import deleteIcon from "../../../images/delete.png";
import { deleteComment } from "../../service/CommentService";

export default function CommentMenu({
  comment,
  postId,
  postIndex,
  postOwnerId,
  commentIndex,
}) {
  const currentUserId = getId();
  const { clickedCommentMenu, toggleCommentMenu, removeComment } =
    useContext(PostsContext);

  const deleteCommentById = async () => {
    const response = await deleteComment(postId, comment.id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    removeComment(comment.id, postId);
  };

  return (
    <div className="comment-menu-container">
      <div
        className="comment-menu-button"
        onClick={() => toggleCommentMenu(comment.id)}
      >
        <img src={menu} alt="menu-pic" className="comment-menu-pic" />
      </div>

      {clickedCommentMenu === comment.id && (
        <div className="comment-menu-dropdown">
          {(currentUserId === comment.user.id ||
            currentUserId === postOwnerId) && (
            <div className="menu-option" onClick={deleteCommentById}>
              <img src={deleteIcon} alt="delete-pic" className="delete-pic" />
              <label className="delete-text">Delete</label>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
