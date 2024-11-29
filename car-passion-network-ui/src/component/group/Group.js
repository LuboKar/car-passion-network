import React from "react";
import "./Group.css";
import GroupProfilePicture from "./GroupProfilePicture";
import useNavigation from "../service/NavigateService";
import GroupMenu from "./GroupMenu";
import { deleteGroup } from "../service/GroupService";

export default function Group({ group, setUserAdminGroups, index }) {
  const { navigateToGroupPage } = useNavigation();

  const deleteGroupById = async () => {
    const response = await deleteGroup(group.id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    setUserAdminGroups((prevUserAdminGroups) => [
      ...prevUserAdminGroups.slice(0, index),
      ...prevUserAdminGroups.slice(index + 1),
    ]);
  };

  return (
    <div className="group-container">
      <div
        className="group-profile-picture"
        onClick={() => navigateToGroupPage(group.id)}
      >
        <GroupProfilePicture />
      </div>

      <label
        className="group-name-label"
        onClick={() => navigateToGroupPage(group.id)}
      >
        {group.name}
      </label>

      <div className="group-menu">
        <GroupMenu adminId={group.admin.id} deleteGroupById={deleteGroupById} />
      </div>
    </div>
  );
}
