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
import DropdownButton from "../../button/DropdownButton.js";

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
    <div className="post-menu-container">
      <div className="post-menu-button" onClick={() => toggleMenu(post.id)}>
        <img src={menu} alt="menu-pic" className="post-menu-icon" />
      </div>

      {clickedMenu === post.id && (
        <div className="post-menu-dropdown">
          <DropdownButton
            buttonIcon={open}
            buttonText="Open"
            buttonOnClick={openPost}
          />

          {currentUserId === post.author.id && (
            <DropdownButton
              buttonIcon={edit}
              buttonText="Edit"
              buttonOnClick={() => toggleEditPost(post.id)}
            />
          )}

          {(currentUserId === post.author.id ||
            currentUserId === post.user.id) && (
            <DropdownButton
              buttonIcon={deleteIcon}
              buttonText="Delete"
              buttonOnClick={() => deletePostById(index, post.id)}
            />
          )}
        </div>
      )}
    </div>
  );
}
