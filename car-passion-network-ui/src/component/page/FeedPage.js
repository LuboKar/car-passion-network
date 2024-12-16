import React, { useState, useEffect, useContext } from "react";
import Navbar from "../pageUtils/navbar/Navbar.js";
import { getAllPosts } from "../service/PostService.js";
import Posts from "../pageUtils/post/Posts.js";
import "./FeedPage.css";
import DashboardHeader from "../pageUtils/dashboard/DashboardHeader.js";
import { getId } from "../service/TokenService.js";
import { PostsContext } from "../context/PostsProvider.js";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar.js";
import useDashboardButtons from "../button/DashboardButtons.js";

export default function FeedPage() {
  const [loadingPosts, setLoadingPosts] = useState(true);
  const currentUserId = getId();

  const { dashboardButtons } = useDashboardButtons();
  dashboardButtons[0].isVisible = true;

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

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dashboard-container">
      <Navbar />

      <VerticalNavbar topButtons={dashboardButtons} />

      {!loadingPosts && (
        <div className="dashboard-posts-container">
          <Posts ownerId={currentUserId} />
        </div>
      )}

      {posts.length < 1 && !loadingPosts && <DashboardHeader />}
    </div>
  );
}
