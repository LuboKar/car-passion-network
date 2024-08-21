import React, { useState } from "react";
import menu from "../../../images/menu.png";
import "./PostMenu.css";
import open from "../../../images/open.png";

export default function PostMenu({ post, navigateToPostPage }) {
  const [clickedMenu, setClickedMenu] = useState(false);

  const toggleMenu = () => {
    setClickedMenu(!clickedMenu);
  };

  return (
    <div className="menu-post-container">
      <div className="menu-button" onClick={toggleMenu}>
        <img src={menu} alt="menu-pic" className="menu-pic" />
      </div>

      {clickedMenu && (
        <div className="menu-post-dropdown">
          <div
            className="menu-option"
            onClick={() => navigateToPostPage(post.id)}
          >
            <img src={open} alt="option-pic" className="option-pic" />
            <label className="open-text">Open</label>
          </div>
        </div>
      )}
    </div>
  );
}
