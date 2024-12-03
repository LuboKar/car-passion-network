import React, { useState, useEffect, useContext } from "react";
import Navbar from "../pageUtils/navbar/Navbar.js";
import { getAllPosts } from "../service/PostService";
import Posts from "../pageUtils/post/Posts.js";
import "./DashboardPage.css";
import DashboardHeader from "../pageUtils/dashboard/DashboardHeader.js";
import { getId } from "../service/TokenService.js";
import { PostsContext } from "../context/PostsProvider.js";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar.js";
import feedIcon from "../../images/feed.png";
import groupIcon from "../../images/groups.png";
import { getGroupsByAdmin } from "../service/GroupService.js";
import Groups from "../group/Groups.js";
import { getOtherGroups } from "../service/GroupService.js";

export default function DashboardPage() {
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [viewFeed, setViewFeed] = useState(true);
  const [viewGroups, setViewGroups] = useState(false);
  const [userAdminGroups, setUserAdminGroups] = useState([]);
  const [otherGroups, setOtherGroups] = useState([]);
  const currentUserId = getId();

  const { posts, setPosts } = useContext(PostsContext);

  const fetchPosts = async () => {
    const response = await getAllPosts();

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const postData = await response.json();
    setPosts(postData);
    setLoadingPosts(false);
  };

  const fetchAdminGroups = async () => {
    const response = await getGroupsByAdmin(currentUserId);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const groupData = await response.json();
    setUserAdminGroups(groupData);
  };

  const fetchOtherGroups = async () => {
    const response = await getOtherGroups(currentUserId);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const groupData = await response.json();
    setOtherGroups(groupData);
  };

  useEffect(() => {
    fetchPosts();
    fetchAdminGroups();
    fetchOtherGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disbleAllButtons = () => {
    setViewFeed(false);
    setViewGroups(false);
  };

  const toggleFeed = () => {
    disbleAllButtons();
    setViewFeed(true);
  };

  const toggleGroups = () => {
    disbleAllButtons();
    setViewGroups(true);
  };

  const topButtons = [
    {
      label: "Feed",
      icon: feedIcon,
      onClick: toggleFeed,
      isVisible: viewFeed,
    },
    {
      label: "Groups",
      icon: groupIcon,
      onClick: toggleGroups,
      isVisible: viewGroups,
    },
  ];

  return (
    <div className="dashboard-container">
      <Navbar />

      <VerticalNavbar topButtons={topButtons} />

      {!loadingPosts && viewFeed && (
        <div className="dashboard-posts-container">
          <Posts ownerId={currentUserId} />
        </div>
      )}

      {posts.length < 1 && !loadingPosts && <DashboardHeader />}

      {viewGroups && (
        <div className="dashboard-groups-container">
          <Groups
            userId={currentUserId}
            userAdminGroups={userAdminGroups}
            setUserAdminGroups={setUserAdminGroups}
            otherGroups={otherGroups}
          />
        </div>
      )}
    </div>
  );
}
