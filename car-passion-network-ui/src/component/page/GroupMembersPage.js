import React, { useState, useEffect, useContext } from "react";
import Navbar from "../pageUtils/navbar/Navbar";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/navbar/RightVerticalNavbar";
import postIcon from "../../images/post.png";
import membersIcon from "../../images/friendIcon.png";
import { useParams } from "react-router-dom";
import GroupProfile from "../group/GroupProfile";
import useNavigation from "../service/NavigateService";
import GroupMembers from "../group/GroupMembers";
import { getAllGroupMembers } from "../service/UserService";
import { GroupProfileContext } from "../context/GroupProfileProvider";

export default function GroupMembersPage() {
  const { id } = useParams();
  const [groupMembers, setGroupMembers] = useState([]);
  const [loadingGroupMembers, setLoadingGroupMembers] = useState(true);
  const [viewMembers] = useState(true);

  const { group, setGroup, loadingGroup } = useContext(GroupProfileContext);

  const { navigateToGroupPage } = useNavigation();

  const fetchGroupMembers = async () => {
    const response = await getAllGroupMembers(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const membersData = await response.json();
    setGroupMembers(membersData);
    setLoadingGroupMembers(false);
  };

  useEffect(() => {
    fetchGroupMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const toggleFeed = () => {
    navigateToGroupPage(id);
  };

  const topButtons = [
    {
      label: "Posts",
      icon: postIcon,
      onClick: toggleFeed,
    },

    {
      label: "Members",
      icon: membersIcon,
      isVisible: viewMembers,
    },
  ];
  return (
    <div className="group-members-page-container">
      <Navbar />

      <VerticalNavbar topButtons={topButtons} />
      <RightVerticalNabvar />

      {!loadingGroup && <GroupProfile group={group} setGroup={setGroup} />}

      {!loadingGroup && !loadingGroupMembers && (
        <GroupMembers
          group={group}
          setGroupMembers={setGroupMembers}
          groupMembers={groupMembers}
        />
      )}
    </div>
  );
}
