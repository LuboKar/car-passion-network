import React, { useState, useEffect } from "react";
import "./GroupProfile.css";
import GroupProfilePicture from "./GroupProfilePicture";
import GroupMenu from "./GroupMenu";
import {
  deleteGroup,
  leaveGroup,
  joinGroup,
  getGroup,
} from "../service/GroupService";
import useNavigation from "../service/NavigateService";
import { getId } from "../service/TokenService";
import { useParams } from "react-router-dom";

export default function GroupProfile() {
  const currentUserId = getId();
  const { navigateToFeedPage, navigateToProfile } = useNavigation();
  const { id } = useParams();
  const [group, setGroup] = useState({});
  const [loadingGroup, setLoadingGroup] = useState(true);

  const fetchGroup = async () => {
    const response = await getGroup(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const groupData = await response.json();
    setGroup(groupData);
    setLoadingGroup(false);
  };

  useEffect(() => {
    fetchGroup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const deleteGroupById = async () => {
    const response = await deleteGroup(group.id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    navigateToFeedPage();
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
      {!loadingGroup && (
        <GroupProfilePicture group={group} setGroup={setGroup} />
      )}

      {!loadingGroup && (
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
      )}

      <div className="group-profile-bottom-border"></div>
    </div>
  );
}
