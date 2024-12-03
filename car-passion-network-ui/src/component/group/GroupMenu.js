import React, { useState } from "react";
import menu from "../../images/menu.png";
import "./GroupMenu.css";
import DropdownButton from "../button/DropdownButton";
import { getId } from "../service/TokenService";
import deleteIcon from "../../images/delete.png";
import joinIcon from "../../images/join.png";

export default function GroupMenu({ group, deleteGroupById, handleJoinGroup }) {
  const [groupMenuDropdown, setGroupMenuGropdown] = useState(false);
  const [currentUserId] = useState(getId());

  const toggleGroupMenuDropdown = () => {
    setGroupMenuGropdown(!groupMenuDropdown);
  };

  const handleDeleteGroup = () => {
    deleteGroupById();
    setGroupMenuGropdown(false);
  };

  return (
    <div className="group-menu-container">
      <div
        className="group-menu-icon-container"
        onClick={toggleGroupMenuDropdown}
      >
        <img src={menu} alt="menu-icon" className="group-menu-icon" />
      </div>

      {groupMenuDropdown && (
        <div className="group-menu-dropdown-container">
          {group.admin.id === currentUserId && (
            <DropdownButton
              buttonIcon={deleteIcon}
              buttonText="Delete"
              buttonOnClick={handleDeleteGroup}
            />
          )}

          {group.admin.id !== currentUserId && !group.currentUserMember && (
            <DropdownButton
              buttonIcon={joinIcon}
              buttonText="Join"
              buttonOnClick={handleJoinGroup}
            />
          )}
        </div>
      )}
    </div>
  );
}
