import React, { useEffect, useState } from "react";
import menu from "../../../images/menu.png";
import "./PostMenu.css";
import open from "../../../images/open.png";
import deleteIcon from "../../../images/delete.png";
import { jwtDecode } from "jwt-decode";
import edit from "../../../images/edit.png";

export default function PostMenu({
  post,
  navigateToPostPage,
  index,
  deletePostById,
  toggleEditPost,
  toggleMenu,
  clickedMenu,
}) {
  const [currentUserId, setCurrentUserId] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(token);
    const id = decodedToken.userId;
    setCurrentUserId(id);
  }, []);

  return (
    <div className="menu-post-container">
      <div className="menu-button" onClick={() => toggleMenu(post.id)}>
        <img src={menu} alt="menu-pic" className="menu-pic" />
      </div>

      {clickedMenu === post.id && (
        <div className="menu-post-dropdown">
          <div
            className="menu-option"
            onClick={() => navigateToPostPage(post.id)}
          >
            <img src={open} alt="option-pic" className="option-pic" />
            <label className="open-text">Open</label>
          </div>

          {currentUserId === post.author.id && (
            <div
              className="menu-option"
              onClick={() => toggleEditPost(post.id)}
            >
              <img src={edit} alt="option-pic" className="option-pic" />
              <label className="edit-text">Edit</label>
            </div>
          )}

          {(currentUserId === post.author.id ||
            currentUserId === post.user.id) && (
            <div
              className="menu-option"
              onClick={() => deletePostById(index, post.id)}
            >
              <img src={deleteIcon} alt="delete-pic" className="delete-pic" />
              <label className="delete-text">Delete</label>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
