import React, { useState, useEffect } from "react";
import Navbar from "../pageUtils/navbar/Navbar";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/navbar/RightVerticalNavbar";
import postIcon from "../../images/post.png";
import GroupProfile from "../group/GroupProfile";
import { getGroup } from "../service/GroupService";
import { useParams } from "react-router-dom";

export default function GroupPage() {
  const { id } = useParams();
  const [viewPosts, setViewPosts] = useState(true);
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

  const topButtons = [
    {
      label: "Posts",
      icon: postIcon,
      //   onClick: togglePosts,
      isVisible: viewPosts,
    },
  ];

  return (
    <div className="group-page-container">
      <Navbar />

      <VerticalNavbar topButtons={topButtons} />
      <RightVerticalNabvar />

      {!loadingGroup && (
        <GroupProfile
          groupId={group.id}
          groupName={group.name}
          adminId={group.admin.id}
        />
      )}
    </div>
  );
}
