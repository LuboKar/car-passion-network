import React, { useState, useEffect } from "react";
import Navbar from "../pageUtils/navbar/Navbar";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/navbar/RightVerticalNavbar";
import postIcon from "../../images/post.png";
import membersIcon from "../../images/friendIcon.png";
import { useParams } from "react-router-dom";
import { getGroup } from "../service/GroupService";
import GroupProfile from "../group/GroupProfile";
import useNavigation from "../service/NavigateService";
import GroupMembers from "../group/GroupMembers";

export default function GroupMembersPage() {
  const { id } = useParams();
  const [group, setGroup] = useState({});
  const [loadingGroup, setLoadingGroup] = useState(true);
  const [viewMembers] = useState(true);

  const { navigateToGroupPage } = useNavigation();

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

      {!loadingGroup && <GroupMembers group={group} setGroup={setGroup} />}
    </div>
  );
}
