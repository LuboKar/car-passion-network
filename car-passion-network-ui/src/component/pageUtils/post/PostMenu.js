import React, { useContext } from "react";
import menu from "../../../images/menu.png";
import "./PostMenu.css";
import open from "../../../images/open.png";
import deleteIcon from "../../../images/delete.png";
import edit from "../../../images/edit.png";
import { PostsContext } from "../../context/PostsProvider";
import { deletePost } from "../../service/PostService";
import useNavigation from "../../service/NavigateService";
import { getId } from "../../service/TokenService";

export default function PostMenu({ post, index }) {
  const currentUserId = getId();
  const { removePost, toggleEditPost, toggleMenu, clickedMenu } =
    useContext(PostsContext);

  const { navigateToPostPage } = useNavigation();

  const deletePostById = async (index, id) => {
    const response = await deletePost(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    removePost(index, id);
  };

  const openPost = () => {
    toggleMenu(0);
    navigateToPostPage(post.id);
  };

  return (
    <div className="menu-post-container">
      <div className="menu-button" onClick={() => toggleMenu(post.id)}>
        <img src={menu} alt="menu-pic" className="menu-pic" />
      </div>

      {clickedMenu === post.id && (
        <div className="menu-post-dropdown">
          <div className="menu-option" onClick={openPost}>
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
