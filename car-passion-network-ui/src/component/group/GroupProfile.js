import React, { useRef } from "react";
import "./GroupProfile.css";
import GroupProfilePicture from "./GroupProfilePicture";
import GroupMenu from "./GroupMenu";
import { deleteGroup } from "../service/GroupService";
import useNavigation from "../service/NavigateService";
import { leaveGroup } from "../service/GroupService";
import { getId } from "../service/TokenService";
import { joinGroup } from "../service/GroupService";
import { uploadGroupPicture } from "../service/GroupService";

export default function GroupProfile({ group, setGroup }) {
  const currentUserId = getId();
  const { navigateToDashboardPage, navigateToProfile } = useNavigation();
  const fileInputRef = useRef(null);

  const handleContainerClick = () => {
    if (group.admin.id !== currentUserId) {
      return;
    }

    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    if (file) {
      const response = await uploadGroupPicture(formData, group.id);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setGroup(data);
    }
  };

  const deleteGroupById = async () => {
    const response = await deleteGroup(group.id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    navigateToDashboardPage();
  };

  const handleLeaveGroup = async () => {
    const response = await leaveGroup(group.id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    navigateToProfile(currentUserId);
  };

  const handleJoinGroup = async () => {
    const response = await joinGroup(group.id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const groupData = await response.json();

    setGroup(groupData);
  };

  return (
    <div className="group-profile-container">
      <div
        className="group-profile-profile-picture-container"
        onClick={handleContainerClick}
      >
        <GroupProfilePicture groupPicture={group.groupPicture} />

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      <div className="group-profile-name-and-menu-container">
        <label className="group-profile-name">{group.name}</label>

        <div className="group-profile-group-menu">
          <GroupMenu
            group={group}
            deleteGroupById={deleteGroupById}
            handleJoinGroup={handleJoinGroup}
            handleLeaveGroup={handleLeaveGroup}
          />
        </div>
      </div>

      <div className="group-profile-bottom-border"></div>
    </div>
  );
}
