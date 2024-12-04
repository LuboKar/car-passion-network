import React from "react";
import "./GroupProfile.css";
import GroupProfilePicture from "./GroupProfilePicture";
import GroupMenu from "./GroupMenu";
import { deleteGroup } from "../service/GroupService";
import useNavigation from "../service/NavigateService";
import { leaveGroup } from "../service/GroupService";
import { getId } from "../service/TokenService";

export default function GroupProfile({ group }) {
  const currentUserId = getId();
  const { navigateToDashboardPage, navigateToProfile } = useNavigation();

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

  return (
    <div className="group-profile-container">
      <div className="group-profile-profile-picture-container">
        <GroupProfilePicture />
      </div>

      <div className="group-profile-name-and-menu-container">
        <label className="group-profile-name">{group.name}</label>

        <div className="group-profile-group-menu">
          <GroupMenu
            group={group}
            deleteGroupById={deleteGroupById}
            handleLeaveGroup={handleLeaveGroup}
          />
        </div>
      </div>

      <div className="group-profile-bottom-border"></div>
    </div>
  );
}
