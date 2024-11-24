import React, { useState } from "react";
import Navbar from "../pageUtils/navbar/Navbar";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/navbar/RightVerticalNavbar";
import postIcon from "../../images/post.png";
import GroupProfile from "../group/GroupProfile";

export default function GroupPage() {
  const [viewPosts, setViewPosts] = useState(true);

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

      <GroupProfile />
    </div>
  );
}
