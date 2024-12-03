import React from "react";
import "./GroupProfile.css";
import GroupProfilePicture from "./GroupProfilePicture";
import GroupMenu from "./GroupMenu";
import { deleteGroup } from "../service/GroupService";
import useNavigation from "../service/NavigateService";

export default function GroupProfile({ group }) {
  const { navigateToDashboardPage } = useNavigation();

  const deleteGroupById = async () => {
    const response = await deleteGroup(group.id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    navigateToDashboardPage();
  };

  return (
    <div className="group-profile-container">
      <div className="group-profile-profile-picture-container">
        <GroupProfilePicture />
      </div>

      <div className="group-profile-name-and-menu-container">
        <label className="group-profile-name">{group.name}</label>

        <div className="group-profile-group-menu">
          <GroupMenu group={group} deleteGroupById={deleteGroupById} />
        </div>
      </div>

      <div className="group-profile-bottom-border"></div>
    </div>
  );
}
