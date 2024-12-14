import React, { useContext } from "react";
import "./Group.css";
import GroupProfilePicture from "./GroupProfilePicture";
import useNavigation from "../service/NavigateService";
import GroupMenu from "./GroupMenu";
import { deleteGroup } from "../service/GroupService";
import { joinGroup } from "../service/GroupService";
import { leaveGroup } from "../service/GroupService";
import { ProfileGroupsContext } from "../context/ProfileGroupsProvider";

export default function Group({ group, index }) {
  const { navigateToGroupPage } = useNavigation();

  const { setUserAdminGroups, setParticipatingGroups, setOtherGroups } =
    useContext(ProfileGroupsContext);

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

  const handleJoinGroup = async () => {
    const response = await joinGroup(group.id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    navigateToGroupPage(group.id);
  };

  const handleLeaveGroup = async () => {
    const response = await leaveGroup(group.id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const leftGroup = await response.json();
    setOtherGroups((prevOtherGroups) => [...prevOtherGroups, leftGroup]);

    setParticipatingGroups((prevParticipatingGroups) => [
      ...prevParticipatingGroups.slice(0, index),
      ...prevParticipatingGroups.slice(index + 1),
    ]);
  };

  return (
    <div className="group-container">
      <div
        className="group-profile-picture"
        onClick={() => navigateToGroupPage(group.id)}
      >
        <GroupProfilePicture groupPicture={group.groupPicture} />
      </div>

      <label
        className="group-name-label"
        onClick={() => navigateToGroupPage(group.id)}
      >
        {group.name}
      </label>

      <div className="group-menu">
        <GroupMenu
          group={group}
          deleteGroupById={deleteGroupById}
          handleJoinGroup={handleJoinGroup}
          handleLeaveGroup={handleLeaveGroup}
        />
      </div>
    </div>
  );
}
